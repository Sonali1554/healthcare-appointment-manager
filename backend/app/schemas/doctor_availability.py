from datetime import time
from uuid import UUID

from pydantic import BaseModel, Field, model_validator


class DoctorAvailabilityCreate(BaseModel):
    weekday: int = Field(ge=0, le=6)
    start_time: time
    end_time: time
    slot_duration_minutes: int = Field(
        default=30,
        ge=5,
        le=240,
    )
    is_active: bool = True

    @model_validator(mode="after")
    def validate_time_range(self):
        if self.start_time >= self.end_time:
            raise ValueError("start_time must be before end_time")

        return self


class DoctorAvailabilityResponse(BaseModel):
    id: UUID
    doctor_id: UUID
    weekday: int
    start_time: time
    end_time: time
    slot_duration_minutes: int
    is_active: bool

    model_config = {
        "from_attributes": True
    }