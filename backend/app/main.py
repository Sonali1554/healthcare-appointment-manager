from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.availability import router as availability_router
from app.api.slots import router as slots_router
from app.api.appointments import router as appointments_router


app = FastAPI(
    title="Healthcare Appointment Manager",
    description="Industry-level healthcare appointment management API",
    version="1.0.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "healthcare-appointment-manager",
    }


app.include_router(auth_router)
app.include_router(availability_router)
app.include_router(slots_router)
app.include_router(appointments_router)