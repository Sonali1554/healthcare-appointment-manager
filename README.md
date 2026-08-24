# 🏥 Healthcare Appointment Manager

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
</p>

<p align="center">
  <b>A full-stack healthcare appointment management platform</b>
</p>

<p align="center">
  Secure Authentication • Doctor Management • Availability • Appointment Slots • Booking • Patient Dashboard
</p>

---

## 🌐 Live Demo

### 🚀 Frontend

**Live Application:**  
https://healthcare-appointment-frontend-mcla.onrender.com


### 📚 Swagger API Documentation

**Interactive API Docs:**  
https://healthcare-appointment-manager-sz8l.onrender.com/docs


---

# 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Complete Application Workflow](#-complete-application-workflow)
- [System Architecture](#-system-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Authentication Flow](#-authentication-flow)
- [Doctor Availability Flow](#-doctor-availability-flow)
- [Appointment Booking Flow](#-appointment-booking-flow)
- [API Request Flow](#-api-request-flow)
- [Database Architecture](#-database-architecture)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Frontend Screenshots](#-frontend-screenshots)
- [Backend Screenshots](#-backend-screenshots)
- [API Endpoints](#-api-endpoints)
- [Local Setup](#-local-setup)
- [Deployment](#-deployment)
- [Security](#-security)
- [Testing](#-testing)
- [Project Status](#-project-status)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📖 Overview

**Healthcare Appointment Manager** is a full-stack web application designed to simplify and digitize healthcare appointment management.

The platform provides a centralized interface where users can:

- Create an account
- Login securely
- Access a personalized dashboard
- Find doctors
- Check doctor availability
- View available appointment slots
- Select an appointment
- Confirm an appointment
- View their appointments
- Manage their profile

The application consists of a **React + Vite frontend**, a **FastAPI REST backend**, and a **PostgreSQL database**.

Authentication is implemented using **JWT-based authentication**, while the backend provides interactive **Swagger/OpenAPI documentation**.

---

# 🎯 Problem Statement

Healthcare appointment management can become difficult when patients have to rely on manual scheduling systems.

Common problems include:

- Difficulty finding available doctors
- Lack of appointment visibility
- Manual appointment scheduling
- Difficulty managing appointments
- Lack of centralized healthcare information
- Security concerns around user accounts

The objective of this project is to provide a secure and user-friendly digital platform for managing healthcare appointments.

---

# 💡 Solution

The Healthcare Appointment Manager provides a complete digital workflow:

```text
User
 │
 ▼
Home Page
 │
 ▼
Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Patient Dashboard
 │
 ▼
Find Doctor
 │
 ▼
Check Doctor Availability
 │
 ▼
View Available Slots
 │
 ▼
Select Appointment Slot
 │
 ▼
Confirm Appointment
 │
 ▼
My Appointments
```

---

# ✨ Key Features

## 🔐 Authentication

- Patient registration
- Doctor registration
- Secure login
- JWT authentication
- OAuth2-compatible login
- Bearer token authorization
- Protected endpoints
- Role-based authorization
- Current-user endpoint
- Logout functionality

## 👨‍⚕️ Doctor Management

- Doctor accounts
- Doctor UUID identification
- Doctor availability
- Availability lookup
- Doctor-specific appointment slots
- Slot generation API

## 🕐 Appointment Slots

- View doctor slots
- Slot date and time
- Slot availability status
- Doctor-specific slots
- Appointment slot selection

## 📅 Appointment Management

- Appointment booking workflow
- Appointment confirmation
- My Appointments
- Appointment status
- Appointment cancellation through API
- Authenticated appointment access

## 👤 Patient Dashboard

- Overview
- Quick actions
- Find Doctor
- Available Slots
- My Appointments
- Profile
- Account information
- Logout

---

# 🔄 Complete Application Workflow

```mermaid
flowchart TD
    A["🏠 Home Page"] --> B{"Existing User?"}

    B -->|"No"| C["📝 Register"]
    B -->|"Yes"| D["🔐 Login"]

    C --> D

    D --> E["JWT Authentication"]

    E --> F["👤 Patient Dashboard"]

    F --> G["👨‍⚕️ Find Doctor"]

    G --> H["Enter Doctor UUID"]

    H --> I["🔎 Check Available Slots"]

    I --> J["📅 Available Slots"]

    J --> K["Select Appointment Slot"]

    K --> L["📋 Booking Confirmation"]

    L --> M["✅ Confirm Appointment"]

    M --> N["📆 My Appointments"]

    F --> O["👤 Profile"]

    F --> P["🚪 Logout"]

    P --> D
```

---

# 🏗️ System Architecture

```mermaid
flowchart TB
    USER["👤 Patient / Doctor"]

    FRONTEND["🌐 React + Vite Frontend"]

    API["⚙️ FastAPI REST API"]

    AUTH["🔐 Authentication"]

    DOCTOR["👨‍⚕️ Doctor Management"]

    AVAILABILITY["📅 Availability Management"]

    SLOTS["🕐 Appointment Slots"]

    APPOINTMENTS["📆 Appointment Management"]

    DATABASE[("🐘 PostgreSQL")]

    USER --> FRONTEND

    FRONTEND -->|"HTTPS / REST API"| API

    API --> AUTH
    API --> DOCTOR
    API --> AVAILABILITY
    API --> SLOTS
    API --> APPOINTMENTS

    AUTH --> DATABASE
    DOCTOR --> DATABASE
    AVAILABILITY --> DATABASE
    SLOTS --> DATABASE
    APPOINTMENTS --> DATABASE
```

---

# 🏛️ Three-Tier Architecture

```text
┌────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER                 │
│                                                    │
│                  React + Vite                     │
│                                                    │
│  Home │ Login │ Dashboard │ Slots │ Appointments │
└─────────────────────────┬──────────────────────────┘
                          │
                          │ REST API
                          ▼
┌────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                 │
│                                                    │
│                    FastAPI                         │
│                                                    │
│ Authentication │ Doctors │ Slots │ Appointments  │
└─────────────────────────┬──────────────────────────┘
                          │
                          │ SQL / ORM
                          ▼
┌────────────────────────────────────────────────────┐
│                     DATA LAYER                     │
│                                                    │
│                   PostgreSQL                       │
│                                                    │
│ Users │ Doctors │ Availability │ Slots │ Bookings │
└────────────────────────────────────────────────────┘
```

---

# 🎨 Frontend Architecture

```mermaid
flowchart TD
    APP["⚛️ React Application"]

    ROUTER["React Router"]

    HOME["🏠 Home"]

    LOGIN["🔐 Login"]

    REGISTER["📝 Register"]

    DASHBOARD["👤 Patient Dashboard"]

    DOCTOR["👨‍⚕️ Find Doctor"]

    SLOTS["🕐 Available Slots"]

    BOOKING["📅 Booking"]

    APPOINTMENTS["📆 My Appointments"]

    PROFILE["👤 Profile"]

    APP --> ROUTER

    ROUTER --> HOME
    ROUTER --> LOGIN
    ROUTER --> REGISTER
    ROUTER --> DASHBOARD

    DASHBOARD --> DOCTOR
    DASHBOARD --> SLOTS
    DASHBOARD --> BOOKING
    DASHBOARD --> APPOINTMENTS
    DASHBOARD --> PROFILE
```

---

# ⚙️ Backend Architecture

```mermaid
flowchart TD
    CLIENT["🌐 React Frontend"]

    FASTAPI["⚙️ FastAPI Application"]

    ROUTERS["API Routers"]

    AUTH["🔐 Authentication"]

    DOCTOR["👨‍⚕️ Doctor Service"]

    AVAILABILITY["📅 Availability Service"]

    SLOT["🕐 Slot Service"]

    APPOINTMENT["📆 Appointment Service"]

    ORM["SQLAlchemy ORM"]

    DATABASE[("🐘 PostgreSQL")]

    CLIENT --> FASTAPI

    FASTAPI --> ROUTERS

    ROUTERS --> AUTH
    ROUTERS --> DOCTOR
    ROUTERS --> AVAILABILITY
    ROUTERS --> SLOT
    ROUTERS --> APPOINTMENT

    AUTH --> ORM
    DOCTOR --> ORM
    AVAILABILITY --> ORM
    SLOT --> ORM
    APPOINTMENT --> ORM

    ORM --> DATABASE
```

---

# 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as React Frontend
    participant A as FastAPI Backend
    participant DB as PostgreSQL

    U->>F: Enter Email + Password

    F->>A: POST /api/v1/auth/login

    A->>DB: Validate Credentials

    DB-->>A: User Data

    A->>A: Generate JWT

    A-->>F: Access Token

    F->>F: Store Token

    F->>A: Protected API Request

    Note over F,A: Authorization: Bearer JWT

    A->>A: Validate JWT

    A->>DB: Fetch Protected Data

    DB-->>A: Data

    A-->>F: JSON Response

    F-->>U: Display Dashboard
```

---

# 👨‍⚕️ Doctor Availability Flow

```mermaid
flowchart TD
    DOCTOR["👨‍⚕️ Doctor"]

    LOGIN["🔐 Doctor Login"]

    AVAILABILITY["📅 Create Availability"]

    API["⚙️ FastAPI"]

    DATABASE[("🐘 PostgreSQL")]

    SLOTS["🕐 Generate Appointment Slots"]

    PATIENT["👤 Patient"]

    VIEW["🔎 View Available Slots"]

    DOCTOR --> LOGIN

    LOGIN --> AVAILABILITY

    AVAILABILITY --> API

    API --> DATABASE

    DATABASE --> SLOTS

    SLOTS --> DATABASE

    PATIENT --> VIEW

    VIEW --> API

    API --> DATABASE

    DATABASE --> VIEW
```

---

# 📅 Appointment Booking Flow

```mermaid
flowchart TD
    PATIENT[" Patient"]

    DASHBOARD["Patient Dashboard"]

    DOCTORID["Enter Doctor UUID"]

    CHECK["Check Available Slots"]

    SLOTS["Available Slots"]

    SELECT["Select Slot"]

    CONFIRMATION["Booking Confirmation"]

    API["FastAPI Appointment API"]

    DATABASE[(" PostgreSQL")]

    SUCCESS[" Appointment Confirmed"]

    MYAPPOINTMENTS[" My Appointments"]

    PATIENT --> DASHBOARD

    DASHBOARD --> DOCTORID

    DOCTORID --> CHECK

    CHECK --> SLOTS

    SLOTS --> SELECT

    SELECT --> CONFIRMATION

    CONFIRMATION --> API

    API --> DATABASE

    DATABASE --> API

    API --> SUCCESS

    SUCCESS --> MYAPPOINTMENTS
```

---

#  API Request Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Perform Action

    Frontend->>Backend: HTTP Request

    Backend->>Backend: Validate Request

    Backend->>Backend: Authenticate JWT

    Backend->>Database: Query / Update Data

    Database-->>Backend: Database Result

    Backend-->>Frontend: JSON Response

    Frontend-->>User: Updated Interface
```

---

#  Database Architecture

```mermaid
erDiagram
    USER ||--o| DOCTOR : "can be"

    DOCTOR ||--o{ AVAILABILITY : manages

    DOCTOR ||--o{ APPOINTMENT_SLOT : has

    USER ||--o{ APPOINTMENT : books

    DOCTOR ||--o{ APPOINTMENT : receives

    APPOINTMENT_SLOT ||--o| APPOINTMENT : assigned_to

    USER {
        uuid id
        string full_name
        string email
        string password
        string role
        boolean is_active
    }

    DOCTOR {
        uuid doctor_id
        uuid user_id
    }

    AVAILABILITY {
        uuid id
        uuid doctor_id
        date date
        time start_time
        time end_time
    }

    APPOINTMENT_SLOT {
        uuid id
        uuid doctor_id
        date date
        time start_time
        time end_time
        string status
    }

    APPOINTMENT {
        uuid id
        uuid patient_id
        uuid doctor_id
        uuid slot_id
        string status
    }
```

---

# ☁️ Deployment Architecture

```mermaid
flowchart LR
    USER["👤 User"]

    FRONTEND["🌐 Render Static Site<br/>React + Vite"]

    BACKEND["⚙️ Render Web Service<br/>FastAPI"]

    DATABASE[("🐘 PostgreSQL")]

    USER -->|"HTTPS"| FRONTEND

    FRONTEND -->|"REST API / HTTPS"| BACKEND

    BACKEND -->|"SQLAlchemy"| DATABASE
```

---

# 📂 Project Structure

```text
healthcare-appointment-manager/
│
├── backend/
│   │
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── App.jsx
│   │   │   ├── App.css
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── vite.config.js
│   │   └── index.html
│   │
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── alembic.ini
│   └── test_db.py
│
├── docs/
│   └── screenshots/
│       ├── frontend-home.png
│       ├── frontend-login.png
│       ├── frontend-dashboard.png
│       ├── frontend-find-doctor.png
│       ├── frontend-slots.png
│       ├── frontend-booking.png
│       ├── frontend-confirmation.png
│       ├── frontend-appointments.png
│       ├── frontend-profile.png
│       ├── backend-swagger.png
│       ├── backend-authentication.png
│       ├── backend-doctor-availability.png
│       ├── backend-slots.png
│       └── backend-appointments.png
│
├── .gitignore
└── README.md
```

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend build tool |
| React Router | Client-side routing |
| JavaScript | Application logic |
| CSS | Styling |
| Lucide React | UI icons |
| FastAPI | REST API |
| Python | Backend |
| Uvicorn | ASGI server |
| SQLAlchemy | ORM |
| Pydantic | Data validation |
| JWT | Authentication |
| OAuth2 | Authentication flow |
| Alembic | Database migrations |
| PostgreSQL | Database |
| Git | Version control |
| GitHub | Repository |
| Render | Deployment |

---

# 🖥️ Frontend Screenshots

> Place your screenshots inside `docs/screenshots/`.

## 🏠 Home Page

<img width="957" height="1198" alt="Screenshot 2026-08-24 144630" src="https://github.com/user-attachments/assets/8c46bb11-be9a-4b4d-9e9e-7f606e32e42d" />
<img width="1917" height="1198" alt="Screenshot 2026-08-24 161426" src="https://github.com/user-attachments/assets/c92b4117-901a-4254-a34c-b69ec8d92d10" />



---

## 🔐 Login Page

![Uploading Screenshot 2026-08-24 144630.png…]()



---

## 👤 Patient Dashboard

<img width="1920" height="1200" alt="Screenshot (1409)" src="https://github.com/user-attachments/assets/4488d7e0-717d-4050-8e9e-d09ac837d151" />


---

## 👨‍⚕️ Find Doctor

<img width="891" height="786" alt="Screenshot 2026-08-24 164511" src="https://github.com/user-attachments/assets/5ff8d801-5b93-437d-ae87-11ca2592b35e" />


---

## 🕐 Available Appointment Slots

<img width="961" height="1197" alt="Screenshot 2026-08-24 172734" src="https://github.com/user-attachments/assets/7f4b3ac5-6514-448a-ac92-2c81f76b878c" />

---

## 📅 Book Appointment

<img width="966" height="1198" alt="Screenshot 2026-08-24 172750" src="https://github.com/user-attachments/assets/d0bf4faf-bf28-45e1-a868-2f1bb7216fb8" />

---

# ⚙️ Backend Screenshots

## 📚 Swagger API Documentation

<img width="952" height="1156" alt="Screenshot 2026-08-23 203326" src="https://github.com/user-attachments/assets/2e2ad984-afa4-49a4-b391-a4856f8d32f7" />


---

## 🔐 Authentication APIs
<img width="966" height="1141" alt="Screenshot 2026-08-23 191407" src="https://github.com/user-attachments/assets/aa86e5da-5bd9-43b5-8789-efd9726fd7e0" />

---

# 📡 API Endpoints

## 🔐 Authentication

### Register

```http
POST /api/v1/auth/register
```

### Login

```http
POST /api/v1/auth/login
```

### Get Current User

```http
GET /api/v1/auth/me
```

---

## 👨‍⚕️ Doctor Availability

### Create Availability

```http
POST /api/v1/doctors/{doctor_id}/availability
```

### Get Availability

```http
GET /api/v1/doctors/{doctor_id}/availability
```

---

## 🕐 Appointment Slots

### Generate Appointment Slots

```http
POST /api/v1/doctors/{doctor_id}/slots/generate
```

### Get Doctor Slots

```http
GET /api/v1/doctors/{doctor_id}/slots
```

---

## 📅 Appointments

### Get My Appointments

```http
GET /api/v1/appointments
```

### Create Appointment

```http
POST /api/v1/appointments
```

### Cancel Appointment

```http
DELETE /api/v1/appointments/{appointment_id}
```

---

# 📚 Swagger / OpenAPI

FastAPI automatically provides interactive API documentation.

### Production Swagger

https://healthcare-appointment-manager-sz8l.onrender.com/docs

Swagger allows developers to test:

```text
Authentication
      ↓
Current User
      ↓
Doctor Availability
      ↓
Appointment Slots
      ↓
Appointments
```

---

# 💻 Local Development

## 1. Clone Repository

```bash
git clone https://github.com/Sonali1554/healthcare-appointment-manager.git
```

```bash
cd healthcare-appointment-manager
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start FastAPI:

```powershell
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal.

```powershell
cd backend/frontend
```

Install dependencies:

```powershell
npm install
```

Start Vite:

```powershell
npm run dev
```

Frontend:

```text
http://localhost:5173
```

If port 5173 is already occupied, Vite automatically selects another available port.

---

# 🚀 Production Deployment

## Frontend

The React/Vite frontend is deployed as a Render Static Site.

### Render Configuration

```text
Root Directory:
backend/frontend

Build Command:
npm install && npm run build

Publish Directory:
dist
```

### Live Frontend

https://healthcare-appointment-frontend-mcla.onrender.com

---

## Backend

The FastAPI backend is deployed as a Render Web Service.

### Live Backend

https://healthcare-appointment-manager-sz8l.onrender.com

### Swagger

https://healthcare-appointment-manager-sz8l.onrender.com/docs

---

# 🔒 Security

The application implements:

- JWT authentication
- OAuth2-compatible authentication
- Bearer token authorization
- Protected API endpoints
- Role-based authorization
- Authenticated user validation
- Active-user validation
- Password authentication
- Input validation
- CORS configuration
- API-level access control

---

# 🧪 Testing

Backend tests can be executed using:

```bash
pytest
```

API endpoints can also be manually tested through Swagger:

https://healthcare-appointment-manager-sz8l.onrender.com/docs

---

# 📊 Project Status

| Component | Status |
|---|---|
| React Frontend | ✅ Working |
| Vite Build | ✅ Working |
| FastAPI Backend | ✅ Working |
| PostgreSQL | ✅ Configured |
| JWT Authentication | ✅ Working |
| Patient Registration | ✅ Working |
| Doctor Registration | ✅ Working |
| Patient Login | ✅ Working |
| Doctor Login | ✅ Working |
| Patient Dashboard | ✅ Working |
| Find Doctor | ✅ Working |
| Available Slots UI | ✅ Working |
| Slot Selection | ✅ Working |
| Booking Confirmation UI | ✅ Working |
| My Appointments UI | ✅ Working |
| Swagger Documentation | ✅ Working |
| Backend Deployment | ✅ Live |
| Frontend Deployment | ✅ Live |
| GitHub Repository | ✅ Updated |

---

# ⚠️ Implementation Note

During development, authorization behavior of some backend appointment and slot operations was tested through Swagger.

The frontend currently contains a UI fallback for the slot and booking demonstration so that the complete appointment experience can be demonstrated through the deployed frontend.

The authentication flow and authenticated user information were successfully verified against the deployed backend.

The backend appointment and slot APIs remain available through Swagger for further backend integration and authorization refinement.

---

# 🔗 Important Links

| Resource | Link |
|---|---|
| 🌐 Live Frontend | https://healthcare-appointment-frontend-mcla.onrender.com |
| ⚙️ Backend API | https://healthcare-appointment-manager-sz8l.onrender.com |
| 📚 Swagger Docs | https://healthcare-appointment-manager-sz8l.onrender.com/docs |
| 💻 GitHub | https://github.com/Sonali1554/healthcare-appointment-manager |

---

# 👩‍💻 Author

## Sonali Kumari

**B.Tech — Computer Science and Engineering**  
**VIT Bhopal University**

---

<p align="center">

### 🏥 Healthcare Appointment Manager

**Secure • Simple • Scalable Healthcare Appointment Management**

</p>
