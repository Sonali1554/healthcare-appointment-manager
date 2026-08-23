# 🏥 Healthcare Appointment Manager

> 🚀 An industry-level REST API for managing doctors, patient authentication, doctor availability, appointment slots, and healthcare appointments.

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.141.1-009688.svg)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791.svg)](https://www.postgresql.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.x-red.svg)](https://www.sqlalchemy.org/)
[![Alembic](https://img.shields.io/badge/Alembic-Migrations-orange.svg)](https://alembic.sqlalchemy.org/)
[![Tests](https://img.shields.io/badge/Tests-6%20Passing-success.svg)](#-testing)

---

## 📌 Overview

The **Healthcare Appointment Manager** is a backend REST API designed to manage the complete appointment scheduling workflow between patients and doctors.

The system provides:

- 🔐 JWT-based authentication
- 👤 Patient and doctor role management
- 👨‍⚕️ Doctor availability management
- 🗓️ Appointment slot generation
- 📅 Appointment booking
- ❌ Appointment cancellation
- 🔄 Appointment status updates
- 🔒 Role-based authorization
- 🗄️ PostgreSQL persistence
- 🔧 Alembic database migrations
- 🧪 Automated API and service tests
- 📖 Interactive Swagger API documentation

The project focuses on building a reliable appointment-management backend with proper authentication, authorization, database transactions, validation, and test coverage.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

The application uses JWT-based authentication.

### Supported roles

- 👤 Patient
- 👨‍⚕️ Doctor

Authentication flow:

```text
User
  ↓
Register / Login
  ↓
JWT Access Token
  ↓
Authenticated API Request
  ↓
JWT Validation
  ↓
User Lookup
  ↓
Role Validation
  ↓
Protected Resource

## 🏗️ System Architecture

```mermaid
flowchart TD
    A[🌐 Client / Swagger UI] --> B[🚀 FastAPI Application]

    B --> C[🔐 Authentication]
    B --> D[👨‍⚕️ Doctor Availability]
    B --> E[🗓️ Appointment Slots]
    B --> F[📅 Appointment Management]

    C --> G[🎫 JWT Authentication]
    G --> H[👤 User & Role Validation]

    D --> I[📋 Availability Service]
    I --> J[⚙️ Slot Generation Service]

    J --> K[(🗄️ PostgreSQL)]

    E --> J
    E --> K

    F --> K

    B --> L[🧪 Pytest Test Suite]

    M[🔧 Alembic Migrations] --> K
```

## 📅 Appointment Booking Workflow

```mermaid
flowchart TD
    A[👨‍⚕️ Doctor] --> B[Set Availability]

    B --> C[⚙️ Generate Appointment Slots]

    C --> D[🟢 Available Slots]

    E[👤 Patient] --> F[View Available Slots]

    F --> G[📅 Select Slot]

    G --> H{Is Slot Available?}

    H -->|❌ No| I[⚠️ Return 409 Conflict]

    H -->|✅ Yes| J[🔒 Lock Slot]

    J --> K[📝 Create Appointment]

    K --> L[🔵 Mark Slot as BOOKED]

    L --> M[💾 Commit Transaction]

    M --> N[✅ Appointment Confirmed]

    N --> O{Appointment Action}

    O -->|Cancel| P[❌ Cancel Appointment]

    P --> Q[♻️ Release Slot]

    O -->|Complete| R[✅ Mark Completed]
```

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant API as 🚀 FastAPI
    participant DB as 🗄️ PostgreSQL

    U->>API: Register / Login
    API->>DB: Find User
    DB-->>API: User Record

    API->>API: 🔒 Verify Password
    API->>API: 🎫 Generate JWT

    API-->>U: Access Token

    U->>API: Protected Request
    API->>API: 🔍 Validate JWT
    API->>DB: Validate User

    DB-->>API: User + Role

    API->>API: 🛡️ Check Permissions
    API-->>U: Protected Response
```

## 🗄️ Database Architecture

```mermaid
erDiagram
    USER ||--o| DOCTOR : has
    DOCTOR ||--o{ DOCTOR_AVAILABILITY : defines
    DOCTOR ||--o{ DOCTOR_LEAVE : has
    DOCTOR ||--o{ APPOINTMENT_SLOT : owns
    USER ||--o{ APPOINTMENT : books
    APPOINTMENT_SLOT ||--o| APPOINTMENT : reserved

    USER {
        UUID id
        string full_name
        string email
        string password_hash
        string role
        boolean is_active
    }

    DOCTOR {
        UUID id
        UUID user_id
        string specialization
        string bio
        int consultation_duration_minutes
    }

    DOCTOR_AVAILABILITY {
        UUID id
        UUID doctor_id
        int weekday
        time start_time
        time end_time
        int slot_duration_minutes
        boolean is_active
    }

    DOCTOR_LEAVE {
        UUID id
        UUID doctor_id
        date leave_date
        string reason
    }

    APPOINTMENT_SLOT {
        UUID id
        UUID doctor_id
        date slot_date
        time start_time
        time end_time
        string status
    }

    APPOINTMENT {
        UUID id
        UUID slot_id
        UUID patient_id
        string status
        datetime booked_at
        string cancellation_reason
    }
```

## 📸 API Demonstration

The API was tested using the built-in Swagger UI provided by FastAPI.

### 🚀 Swagger API Documentation

The Swagger interface provides interactive documentation for all available endpoints, including authentication, doctor availability, appointment slots, and appointment management.

![Swagger API Documentation](docs/screenshots/swagger-overview.png)

---

### 🗓️ Appointment Management

The appointment module supports:

- 📋 Get patient appointments
- ➕ Create appointments
- ❌ Cancel appointments
- 👨‍⚕️ Get doctor appointments
- 🔄 Update appointment status

![Appointment Management APIs](docs/screenshots/appointment-management.png)

---

### 🔄 Appointment Status Update

Appointment status can be updated through the PATCH endpoint.

Example:

```json
{
  "status": "completed"
}
```

![Appointment Status Update](docs/screenshots/appointment-status.png)

---

### 🔐 Authentication & Authorization

Protected endpoints use JWT Bearer authentication.

The Swagger UI allows authenticated requests through the **Authorize 🔒** button.

![Authentication](docs/screenshots/authentication.png)

---

### 🧪 API Testing

The backend was tested through both automated tests and Swagger API execution.

```text
6 passed
```

Test coverage includes:

- ✅ Patient appointment booking
- ✅ Duplicate slot protection
- ✅ Appointment cancellation
- ✅ Slot release after cancellation
- ✅ Role-based authorization
- ✅ Doctor/patient access control
- ✅ Slot generation

---

### ⚠️ Error Handling

The API also validates invalid requests and unauthorized operations.

Example response:

```text
500 Internal Server Error
```

This screenshot represents an error encountered during API testing and is included as part of the debugging/testing process.

![API Error Testing](docs/screenshots/api-error.png)

