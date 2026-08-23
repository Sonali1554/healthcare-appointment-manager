from datetime import date, datetime, time, timedelta
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.appointment_slot import AppointmentSlot, SlotStatus
from app.models.doctor_availability import DoctorAvailability
from app.models.doctor_leave import DoctorLeave


def generate_slots_for_date(
    db: Session,
    doctor_id: UUID,
    target_date: date,
) -> list[AppointmentSlot]:
    """
    Generate appointment slots for a doctor on a specific date.

    Rules:
    - Doctor must have active availability for that weekday.
    - Doctor must not be on leave.
    - Existing slots are not duplicated.
    """

    # 1. Check whether doctor is on leave.
    leave_exists = db.scalar(
        select(DoctorLeave.id).where(
            DoctorLeave.doctor_id == doctor_id,
            DoctorLeave.leave_date == target_date,
        )
    )

    if leave_exists:
        return []

    # 2. Convert Python weekday to our database weekday.
    weekday = target_date.weekday()

    # 3. Get doctor's availability.
    availability = db.scalars(
        select(DoctorAvailability).where(
            DoctorAvailability.doctor_id == doctor_id,
            DoctorAvailability.weekday == weekday,
            DoctorAvailability.is_active.is_(True),
        )
    ).all()

    if not availability:
        return []

    created_slots: list[AppointmentSlot] = []

    # 4. Generate slots for each availability window.
    for schedule in availability:

        current = datetime.combine(
            target_date,
            schedule.start_time,
        )

        end = datetime.combine(
            target_date,
            schedule.end_time,
        )

        duration = timedelta(
            minutes=schedule.slot_duration_minutes
        )

        while current + duration <= end:

            slot_start = current.time()
            slot_end = (current + duration).time()

            # 5. Check whether this slot already exists.
            existing_slot = db.scalar(
                select(AppointmentSlot).where(
                    AppointmentSlot.doctor_id == doctor_id,
                    AppointmentSlot.slot_date == target_date,
                    AppointmentSlot.start_time == slot_start,
                )
            )

            if existing_slot:
                current += duration
                continue

            # 6. Create the slot.
            slot = AppointmentSlot(
                doctor_id=doctor_id,
                slot_date=target_date,
                start_time=slot_start,
                end_time=slot_end,
                status=SlotStatus.AVAILABLE,
            )

            db.add(slot)
            created_slots.append(slot)

            current += duration

    db.commit()

    # Refresh generated objects.
    for slot in created_slots:
        db.refresh(slot)

    return created_slots