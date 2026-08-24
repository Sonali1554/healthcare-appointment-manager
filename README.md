# 🏥 Healthcare Appointment Manager

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
</p>

<p align="center">
  <b>A full-stack healthcare appointment management platform for patients and doctors.</b>
</p>

<p align="center">
  Secure authentication • Doctor availability • Appointment slots • Appointment booking • Patient dashboard • REST APIs
</p>

---

# 🌐 Live Application

### 🚀 Frontend

👉 https://healthcare-appointment-frontend-mcla.onrender.com


### 📚 Swagger API Documentation

👉 https://healthcare-appointment-manager-sz8l.onrender.com/docs

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Application Workflow](#-application-workflow)
- [System Architecture](#-system-architecture)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Authentication Flow](#-authentication-flow)
- [Appointment Booking Flow](#-appointment-booking-flow)
- [Doctor Availability Flow](#-doctor-availability-flow)
- [API Request Flow](#-api-request-flow)
- [Database Architecture](#-database-architecture)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Frontend Screenshots](#-frontend-screenshots)
- [Backend Screenshots](#-backend-screenshots)
- [API Documentation](#-api-documentation)
- [Local Setup](#-local-setup)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📖 Project Overview

Healthcare Appointment Manager is a full-stack web application designed to simplify the process of managing healthcare appointments.

The platform provides separate capabilities for:

- Patients
- Doctors
- Appointment management
- Doctor availability
- Appointment slots
- Authentication
- Profile management

The application consists of a **React + Vite frontend** communicating with a **FastAPI REST backend** through HTTP APIs.

Authentication is handled using **JWT access tokens**, while the backend exposes interactive API documentation through **Swagger/OpenAPI**.

---

# 🎯 Problem Statement

Traditional appointment management can involve:

- Manual appointment scheduling
- Difficulty checking doctor availability
- Unclear appointment timings
- Lack of centralized appointment information
- Poor visibility of upcoming appointments
- Security concerns around healthcare accounts

The goal of this project is to provide a centralized digital platform where users can securely manage the appointment process.

---

# 💡 Solution

The system provides a complete digital workflow:

```text
User
 │
 ▼
Registration / Login
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
Check Availability
 │
 ▼
View Appointment Slots
 │
 ▼
Select Slot
 │
 ▼
Book Appointment
 │
 ▼
Appointment Confirmation
 │
 ▼
My Appointments
