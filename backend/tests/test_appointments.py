from datetime import date, time

from app.core.security import hash_password
from app.models.appointment_slot import AppointmentSlot, SlotStatus
from app.models.doctor import Doctor
from app.models.user import User, UserRole


def create_user(
    db,
    email: str,
    role: UserRole,
):
    user = User(
        full_name=f"Test {role.value.title()}",
        email=email,
        password_hash=hash_password("TestPass123"),
        role=role,
        is_active=True,
    )

    db.add(user)
    db.flush()

    if role == UserRole.DOCTOR:
        doctor = Doctor(
            user_id=user.id,
            specialization="General Medicine",
            consultation_duration_minutes=30,
        )

        db.add(doctor)
        db.flush()

    return user


def get_token(client, email: str):
    response = client.post(
        "/api/v1/auth/login",
        data={
            "username": email,
            "password": "TestPass123",
        },
    )

    assert response.status_code == 200

    return response.json()["access_token"]


def test_patient_can_book_appointment(client, db):
    doctor_user = create_user(
        db,
        "testdoctor@example.com",
        UserRole.DOCTOR,
    )

    patient = create_user(
        db,
        "testpatient@example.com",
        UserRole.PATIENT,
    )

    doctor = db.query(Doctor).filter(
        Doctor.user_id == doctor_user.id
    ).first()

    slot = AppointmentSlot(
        doctor_id=doctor.id,
        slot_date=date(2026, 8, 25),
        start_time=time(10, 0),
        end_time=time(10, 30),
        status=SlotStatus.AVAILABLE,
    )

    db.add(slot)
    db.commit()
    db.refresh(slot)

    token = get_token(
        client,
        patient.email,
    )

    response = client.post(
        "/api/v1/appointments",
        json={
            "slot_id": str(slot.id),
        },
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["slot_id"] == str(slot.id)
    assert data["patient_id"] == str(patient.id)
    assert data["status"] == "confirmed"

    db.refresh(slot)

    assert slot.status == SlotStatus.BOOKED


def test_cannot_book_same_slot_twice(client, db):
    doctor_user = create_user(
        db,
        "doctor2@example.com",
        UserRole.DOCTOR,
    )

    patient = create_user(
        db,
        "patient2@example.com",
        UserRole.PATIENT,
    )

    doctor = db.query(Doctor).filter(
        Doctor.user_id == doctor_user.id
    ).first()

    slot = AppointmentSlot(
        doctor_id=doctor.id,
        slot_date=date(2026, 8, 26),
        start_time=time(10, 0),
        end_time=time(10, 30),
        status=SlotStatus.AVAILABLE,
    )

    db.add(slot)
    db.commit()
    db.refresh(slot)

    token = get_token(
        client,
        patient.email,
    )

    headers = {
        "Authorization": f"Bearer {token}",
    }

    first_response = client.post(
        "/api/v1/appointments",
        json={
            "slot_id": str(slot.id),
        },
        headers=headers,
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/api/v1/appointments",
        json={
            "slot_id": str(slot.id),
        },
        headers=headers,
    )

    assert second_response.status_code == 409

    assert second_response.json()["detail"] == (
        "Appointment slot is not available"
    )


def test_cancel_appointment_releases_slot(client, db):
    doctor_user = create_user(
        db,
        "doctor3@example.com",
        UserRole.DOCTOR,
    )

    patient = create_user(
        db,
        "patient3@example.com",
        UserRole.PATIENT,
    )

    doctor = db.query(Doctor).filter(
        Doctor.user_id == doctor_user.id
    ).first()

    slot = AppointmentSlot(
        doctor_id=doctor.id,
        slot_date=date(2026, 8, 27),
        start_time=time(11, 0),
        end_time=time(11, 30),
        status=SlotStatus.AVAILABLE,
    )

    db.add(slot)
    db.commit()
    db.refresh(slot)

    token = get_token(
        client,
        patient.email,
    )

    headers = {
        "Authorization": f"Bearer {token}",
    }

    booking_response = client.post(
        "/api/v1/appointments",
        json={
            "slot_id": str(slot.id),
        },
        headers=headers,
    )

    assert booking_response.status_code == 201

    appointment_id = booking_response.json()["id"]

    db.refresh(slot)

    assert slot.status == SlotStatus.BOOKED

    cancel_response = client.delete(
        f"/api/v1/appointments/{appointment_id}",
        headers=headers,
    )

    assert cancel_response.status_code == 200

    data = cancel_response.json()

    assert data["id"] == appointment_id
    assert data["status"] == "cancelled"

    db.refresh(slot)

    assert slot.status == SlotStatus.AVAILABLE


def test_patient_cannot_create_doctor_availability(client, db):
    doctor_user = create_user(
        db,
        "doctor4@example.com",
        UserRole.DOCTOR,
    )

    patient = create_user(
        db,
        "patient4@example.com",
        UserRole.PATIENT,
    )

    doctor = db.query(Doctor).filter(
        Doctor.user_id == doctor_user.id
    ).first()

    token = get_token(
        client,
        patient.email,
    )

    response = client.post(
        f"/api/v1/doctors/{doctor.id}/availability",
        json={
            "weekday": 1,
            "start_time": "09:00:00",
            "end_time": "17:00:00",
            "slot_duration_minutes": 30,
            "is_active": True,
        },
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 403

    assert response.json()["detail"] == (
        "Doctor access required"
    )


def test_doctor_cannot_get_patient_appointments(client, db):
    doctor_user = create_user(
        db,
        "doctor5@example.com",
        UserRole.DOCTOR,
    )

    token = get_token(
        client,
        doctor_user.email,
    )

    response = client.get(
        "/api/v1/appointments",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 403

    assert response.json()["detail"] == (
        "Patient access required"
    )