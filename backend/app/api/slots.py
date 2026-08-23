from datetime import date
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_doctor
from app.models.appointment_slot import AppointmentSlot, SlotStatus
from app.models.doctor import Doctor
from app.schemas.slot import (
    AppointmentSlotResponse,
    SlotGenerateRequest,
)
from app.services.slot_services import generate_slots_for_date


router = APIRouter(
    prefix="/api/v1/doctors",
    tags=["Appointment Slots"],
)


@router.post(
    "/{doctor_id}/slots/generate",
    response_model=list[AppointmentSlotResponse],
    status_code=status.HTTP_201_CREATED,
)
def generate_appointment_slots(
    doctor_id: UUID,
    payload: SlotGenerateRequest,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """
    Generate appointment slots for an authenticated doctor
    on a specific date.
    """

    if current_doctor.id != doctor_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only generate slots for your own schedule",
        )

    slots = generate_slots_for_date(
        db=db,
        doctor_id=doctor_id,
        target_date=payload.target_date,
    )

    return slots


@router.get(
    "/{doctor_id}/slots",
    response_model=list[AppointmentSlotResponse],
)
def get_doctor_slots(
    doctor_id: UUID,
    slot_date: date | None = Query(
        default=None,
        description="Filter slots by date",
    ),
    available_only: bool = Query(
        default=True,
        description="Return only available slots",
    ),
    db: Session = Depends(get_db),
):
    """
    Get appointment slots for a doctor.

    This endpoint is public because patients need
    to see available appointment slots.
    """

    query = select(AppointmentSlot).where(
        AppointmentSlot.doctor_id == doctor_id
    )

    if slot_date is not None:
        query = query.where(
            AppointmentSlot.slot_date == slot_date
        )

    if available_only:
        query = query.where(
            AppointmentSlot.status == SlotStatus.AVAILABLE
        )

    query = query.order_by(
        AppointmentSlot.slot_date,
        AppointmentSlot.start_time,
    )

    slots = db.scalars(query).all()

    return slots