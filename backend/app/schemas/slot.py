from datetime import date, time
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.appointment_slot import SlotStatus


class SlotGenerateRequest(BaseModel):
    target_date: date


class AppointmentSlotResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    doctor_id: UUID
    slot_date: date
    start_time: time
    end_time: time
    status: SlotStatus