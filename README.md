# 🏥 Healthcare Appointment Manager

A full-stack healthcare appointment management platform that allows patients to securely authenticate, find doctors, view available appointment slots, and book healthcare appointments.

The application combines a modern React frontend with a FastAPI REST backend and JWT-based authentication.

---

## 🚀 Live Demo

### 🌐 Frontend
**Live Application:**  
https://healthcare-appointment-frontend-mcla.onrender.com

### ⚙️ Backend API
**Backend API:**  
https://healthcare-appointment-manager-sz8l.onrender.com

### 📚 API Documentation
**Swagger UI:**  
https://healthcare-appointment-manager-sz8l.onrender.com/docs

---

# ✨ Features

## 🔐 Authentication

- Patient and Doctor registration
- Secure login
- JWT-based authentication
- Protected API endpoints
- Role-based access control
- Authenticated user profile
- Logout functionality

---

## 👨‍⚕️ Doctor Management

- Doctor accounts
- Doctor identification using UUID
- Doctor availability management
- Appointment slot management
- Doctor-specific appointment slots

---

## 📅 Appointment Management

- View available appointment slots
- Select a preferred date and time
- Book an appointment
- View appointment confirmation
- View patient's appointments
- Appointment status tracking
- Prevention of unauthorized access through authentication

---

## 👤 Patient Dashboard

The patient dashboard provides a centralized interface for managing healthcare activities.

### Dashboard includes:

- Overview
- My Appointments
- Find Doctors
- Available Slots
- Profile
- Secure account information
- Quick actions

---

# 🖥️ Application Workflow

The complete application workflow is:

```text
                    ┌──────────────────┐
                    │   Home Page      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Register / Login │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Patient Dashboard│
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Find Doctor     My Appointments   Profile
              │
              ▼
        Enter Doctor ID
              │
              ▼
        Check Available Slots
              │
              ▼
       Select Appointment Slot
              │
              ▼
        Book Appointment
              │
              ▼
       Confirm Appointment
              │
              ▼
       My Appointments
