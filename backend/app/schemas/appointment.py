from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.appointment import AppointmentStatus


class AppointmentCreate(BaseModel):
    slot_id: UUID


class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus


class AppointmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    slot_id: UUID
    patient_id: UUID
    status: AppointmentStatus
    cancellation_reason: str | None = None
    booked_at: datetime | None = None