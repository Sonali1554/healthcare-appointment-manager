from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_doctor
from app.models.doctor import Doctor
from app.models.doctor_availability import DoctorAvailability
from app.schemas.doctor_availability import (
    DoctorAvailabilityCreate,
    DoctorAvailabilityResponse,
)


router = APIRouter(
    prefix="/api/v1/doctors",
    tags=["Doctor Availability"],
)


@router.post(
    "/{doctor_id}/availability",
    response_model=DoctorAvailabilityResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_availability(
    doctor_id: UUID,
    payload: DoctorAvailabilityCreate,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db),
):
    """
    Create availability for the authenticated doctor.

    The doctor_id in the URL must belong to the
    currently authenticated doctor.
    """

    # Prevent one doctor from modifying another doctor's schedule.
    if doctor_id != current_doctor.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage your own availability",
        )

    availability = DoctorAvailability(
        doctor_id=current_doctor.id,
        weekday=payload.weekday,
        start_time=payload.start_time,
        end_time=payload.end_time,
        slot_duration_minutes=payload.slot_duration_minutes,
        is_active=payload.is_active,
    )

    db.add(availability)
    db.commit()
    db.refresh(availability)

    return availability


@router.get(
    "/{doctor_id}/availability",
    response_model=list[DoctorAvailabilityResponse],
)
def get_availability(
    doctor_id: UUID,
    db: Session = Depends(get_db),
):
    """
    Get availability for a doctor.

    This endpoint is public because patients need
    to see a doctor's available schedule.
    """

    doctor = db.scalar(
        select(Doctor).where(Doctor.id == doctor_id)
    )

    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    availability = db.scalars(
        select(DoctorAvailability)
        .where(
            DoctorAvailability.doctor_id == doctor_id
        )
        .order_by(
            DoctorAvailability.weekday,
            DoctorAvailability.start_time,
        )
    ).all()

    return availability