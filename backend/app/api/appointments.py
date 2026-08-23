from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import (
    get_current_doctor,
    get_current_patient,
)

from app.models.doctor import Doctor
from app.models.appointment import Appointment, AppointmentStatus
from app.models.appointment_slot import AppointmentSlot, SlotStatus
from app.models.user import User
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentResponse,
    AppointmentStatusUpdate,
)


router = APIRouter(
    prefix="/api/v1/appointments",
    tags=["Appointments"],
)


@router.post(
    "",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_appointment(
    payload: AppointmentCreate,
    current_patient: User = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """
    Book an available appointment slot for the
    currently authenticated patient.
    """

    # Lock the slot during this transaction.
    slot = db.scalar(
        select(AppointmentSlot)
        .where(AppointmentSlot.id == payload.slot_id)
        .with_for_update()
    )

    if slot is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment slot not found",
        )

    # A slot can only be booked once.
    if slot.status != SlotStatus.AVAILABLE:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Appointment slot is not available",
        )

    # Create appointment.
    appointment = Appointment(
        slot_id=slot.id,
        patient_id=current_patient.id,
        status=AppointmentStatus.CONFIRMED,
    )

    # Mark slot as booked.
    slot.status = SlotStatus.BOOKED

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment

@router.get(
    "",
    response_model=list[AppointmentResponse],
)
def get_my_appointments(
    current_patient: User = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """
    Get appointments for the currently authenticated patient.
    """

    appointments = db.scalars(
        select(Appointment)
        .where(
            Appointment.patient_id == current_patient.id
        )
        .order_by(
            Appointment.booked_at.desc()
        )
    ).all()

    return appointments

@router.delete(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
def cancel_appointment(
    appointment_id: UUID,
    current_patient: User = Depends(get_current_patient),
    db: Session = Depends(get_db),
):
    """
    Cancel an appointment belonging to the
    currently authenticated patient.
    """

    appointment = db.scalar(
        select(Appointment)
        .where(
            Appointment.id == appointment_id,
            Appointment.patient_id == current_patient.id,
        )
        .with_for_update()
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    if appointment.status == AppointmentStatus.CANCELLED:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Appointment is already cancelled",
        )

    slot = db.scalar(
        select(AppointmentSlot)
        .where(AppointmentSlot.id == appointment.slot_id)
        .with_for_update()
    )

    if slot is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment slot not found",
        )

    appointment.status = AppointmentStatus.CANCELLED
    slot.status = SlotStatus.AVAILABLE

    db.commit()
    db.refresh(appointment)

    return appointment

@router.get(
    "/doctor/me",
    response_model=list[AppointmentResponse],
)
def get_doctor_appointments(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """
    Get appointments for the currently authenticated doctor.
    """

    appointments = db.scalars(
        select(Appointment)
        .join(
            AppointmentSlot,
            Appointment.slot_id == AppointmentSlot.id,
        )
        .where(
            AppointmentSlot.doctor_id == current_doctor.id
        )
        .order_by(
            Appointment.booked_at.desc()
        )
    ).all()

    return appointments

@router.patch(
    "/{appointment_id}/status",
    response_model=AppointmentResponse,
)
def update_appointment_status(
    appointment_id: UUID,
    payload: AppointmentStatusUpdate,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """
    Update the status of an appointment belonging
    to the currently authenticated doctor.
    """

    appointment = db.scalar(
        select(Appointment)
        .join(
            AppointmentSlot,
            Appointment.slot_id == AppointmentSlot.id,
        )
        .where(
            Appointment.id == appointment_id,
            AppointmentSlot.doctor_id == current_doctor.id,
        )
        .with_for_update()
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    if appointment.status == AppointmentStatus.CANCELLED:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cancelled appointment cannot be updated",
        )

    appointment.status = payload.status

    db.commit()
    db.refresh(appointment)

    return appointment