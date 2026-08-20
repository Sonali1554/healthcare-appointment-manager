from fastapi import FastAPI

app = FastAPI(
    title="Healthcare Appointment & Follow-up Manager",
    description="Industry-level healthcare appointment management platform",
    version="1.0.0",
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "healthcare-appointment-manager"
    }