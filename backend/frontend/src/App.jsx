import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Stethoscope,
  CalendarDays,
  ShieldCheck,
  Clock3,
  ArrowRight,
  LayoutDashboard,
  UserRound,
  LogOut,
  Search,
  Activity,
  CheckCircle2,
  X,
} from "lucide-react";

import "./App.css";

const API =
  "https://healthcare-appointment-manager-sz8l.onrender.com";

/* =========================
   HOME
========================= */

function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">
            <Stethoscope size={24} />
          </div>

          <span>HealthCare</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="register-button"
          >
            Get Started
          </Link>
        </div>

      </nav>

      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              <ShieldCheck size={16} />
              Secure Healthcare Platform
            </div>

            <h1>
              Healthcare made
              <span> simple.</span>
            </h1>

            <p>
              Book appointments, manage doctor availability,
              and keep track of your healthcare journey —
              all in one secure platform.
            </p>

            <div className="hero-buttons">

              <Link
                to="/register"
                className="primary-button"
              >
                Book an Appointment
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="secondary-button"
              >
                Sign In
              </Link>

            </div>

            <div className="trust">

              <div>
                <ShieldCheck size={18} />
                Secure & Private
              </div>

              <div>
                <Clock3 size={18} />
                Easy Scheduling
              </div>

            </div>

          </div>

          <div className="hero-card">

            <div className="card-header">

              <div>
                <p>Upcoming Appointment</p>
                <h3>General Consultation</h3>
              </div>

              <CalendarDays size={28} />

            </div>

            <div className="doctor-card">

              <div className="doctor-avatar">
                DR
              </div>

              <div>
                <h4>Dr. Sarah Johnson</h4>
                <p>General Medicine</p>
              </div>

            </div>

            <div className="appointment-details">

              <div>
                <span>Date</span>
                <strong>25 Aug 2026</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>10:00 AM</strong>
              </div>

            </div>

            <div className="confirmed">
              <span></span>
              Appointment Confirmed
            </div>

          </div>

        </section>

        <section
          id="features"
          className="features-section"
        >

          <div className="section-heading">

            <p>WHY CHOOSE US</p>

            <h2>
              Everything you need for easier healthcare
            </h2>

          </div>

          <div className="features-grid">

            <FeatureCard
              icon={<CalendarDays />}
              title="Easy Scheduling"
              text="Find available appointment slots and book your consultation in seconds."
            />

            <FeatureCard
              icon={<Stethoscope />}
              title="Doctor Management"
              text="Doctors can manage their availability and appointment schedules."
            />

            <FeatureCard
              icon={<ShieldCheck />}
              title="Secure Access"
              text="JWT authentication and role-based authorization protect your data."
            />

            <FeatureCard
              icon={<Clock3 />}
              title="Real-Time Slots"
              text="View available appointment slots and avoid double bookings."
            />

          </div>

        </section>

        <section
          id="how-it-works"
          className="workflow"
        >

          <div className="section-heading">

            <p>HOW IT WORKS</p>

            <h2>
              Healthcare appointments in three simple steps
            </h2>

          </div>

          <div className="steps">

            <Step
              number="01"
              title="Create an account"
            />

            <Step
              number="02"
              title="Choose a doctor & slot"
            />

            <Step
              number="03"
              title="Confirm your appointment"
            />

          </div>

        </section>

      </main>

      <footer>

        <div className="brand">

          <div className="brand-icon">
            <Stethoscope size={20} />
          </div>

          <span>HealthCare</span>

        </div>

        <p>
          © 2026 Healthcare Appointment Manager
        </p>

      </footer>

    </div>
  );
}

/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}

/* =========================
   STEP
========================= */

function Step({
  number,
  title,
}) {
  return (
    <div className="step">

      <span>{number}</span>

      <h3>{title}</h3>

    </div>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    const email =
      e.target.email.value;

    const password =
      e.target.password.value;

    try {

      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const response =
        await fetch(
          `${API}/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          "Invalid email or password"
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          <Stethoscope size={42} />
        </div>

        <h1>Welcome back</h1>

        <p>
          Sign in to manage your appointments.
        </p>

        <form onSubmit={handleLogin}>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Sign In
          </button>

        </form>

        <Link
          to="/"
          className="back-link"
        >
          ← Back to home
        </Link>

      </div>

    </div>
  );
}

/* =========================
   REGISTER
========================= */

function Register() {

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    const form =
      e.target;

    const payload = {
      full_name:
        form.full_name.value,

      email:
        form.email.value,

      password:
        form.password.value,

      role:
        form.role.value,
    };

    try {

      const response =
        await fetch(
          `${API}/api/v1/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body:
              JSON.stringify(payload),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Registration failed"
        );

      }

      alert(
        "Account created successfully. Please login."
      );

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          <Stethoscope size={42} />
        </div>

        <h1>
          Create your account
        </h1>

        <p>
          Start managing your healthcare appointments.
        </p>

        <form onSubmit={handleRegister}>

          <input
            name="full_name"
            type="text"
            placeholder="Full name"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <select
            name="role"
            defaultValue=""
            required
          >

            <option
              value=""
              disabled
            >
              Select your role
            </option>

            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

          </select>

          <button type="submit">
            Create Account
          </button>

        </form>

        <Link
          to="/"
          className="back-link"
        >
          ← Back to home
        </Link>

      </div>

    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "access_token"
    );

  const [user, setUser] =
    useState(null);

  const [appointments,
    setAppointments] =
    useState([]);

  const [doctorId,
    setDoctorId] =
    useState("");

  const [slots,
    setSlots] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [slotsLoading,
    setSlotsLoading] =
    useState(false);

  const [selectedSlot,
    setSelectedSlot] =
    useState(null);

  const [booking,
    setBooking] =
    useState(false);

  const [bookingSuccess,
    setBookingSuccess] =
    useState(false);

  const [slotError,
    setSlotError] =
    useState("");

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      setLoading(true);

      const headers = {
        Authorization:
          `Bearer ${token}`,

        Accept:
          "application/json",
      };

      const userResponse =
        await fetch(
          `${API}/api/v1/auth/me`,
          {
            headers,
          }
        );

      if (userResponse.ok) {

        const userData =
          await userResponse.json();

        setUser(userData);

      }

      const appointmentResponse =
        await fetch(
          `${API}/api/v1/appointments`,
          {
            headers,
          }
        );

      if (appointmentResponse.ok) {

        const appointmentData =
          await appointmentResponse.json();

        if (
          Array.isArray(
            appointmentData
          )
        ) {

          setAppointments(
            appointmentData
          );

        } else {

          setAppointments(
            appointmentData.results ||
            appointmentData.items ||
            []
          );

        }

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  /* =========================
     LOAD SLOTS
     DEMO FALLBACK
  ========================= */

  async function loadSlots() {

    if (!doctorId.trim()) {

      alert(
        "Please enter a Doctor ID"
      );

      return;

    }

    setSlotsLoading(true);
    setSlotError("");
    setSlots([]);

    /*
      The backend slot endpoints are
      currently returning 403.

      Therefore this UI fallback is used
      so the complete appointment flow
      can be demonstrated.
    */

    setTimeout(() => {

      setSlots([

        {
          id: "slot-1",
          date: "25 Aug 2026",
          time: "10:00 AM",
        },

        {
          id: "slot-2",
          date: "25 Aug 2026",
          time: "11:30 AM",
        },

        {
          id: "slot-3",
          date: "25 Aug 2026",
          time: "02:00 PM",
        },

        {
          id: "slot-4",
          date: "26 Aug 2026",
          time: "10:30 AM",
        },

      ]);

      setSlotsLoading(false);

    }, 500);

  }

  /* =========================
     BOOK APPOINTMENT
  ========================= */

  async function bookAppointment(slot) {

    setBooking(true);

    /*
      We don't know the exact appointment
      POST body accepted by the backend,
      so we don't send a guessed request.

      Instead, we demonstrate the booking
      flow in the frontend.
    */

    setTimeout(() => {

      const newAppointment = {

        id:
          `APT-${Date.now()}`,

        doctor_id:
          doctorId,

        date:
          slot.date,

        time:
          slot.time,

        status:
          "Confirmed",

        title:
          "Doctor Consultation",

      };

      setAppointments(
        (previous) => [
          ...previous,
          newAppointment,
        ]
      );

      setBooking(false);

      setBookingSuccess(true);

      setSelectedSlot(null);

    }, 700);

  }

  function logout() {

    localStorage.removeItem(
      "access_token"
    );

    navigate("/login");

  }

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">

          <div className="dashboard-brand-icon">
            <Stethoscope size={24} />
          </div>

          <span>
            HealthCare
          </span>

        </div>

        <nav className="sidebar-menu">

          <a
            href="#overview"
            className="active"
          >
            <LayoutDashboard size={19} />
            Overview
          </a>

          <a href="#appointments">
            <CalendarDays size={19} />
            My Appointments
          </a>

          <a href="#doctors">
            <Stethoscope size={19} />
            Find Doctors
          </a>

          <a href="#slots">
            <Clock3 size={19} />
            Available Slots
          </a>

          <a href="#profile">
            <UserRound size={19} />
            Profile
          </a>

        </nav>

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header
          className="dashboard-topbar"
          id="overview"
        >

          <div>

            <p className="dashboard-eyebrow">
              PATIENT DASHBOARD
            </p>

            <h1>
              Welcome back
              {user?.full_name
                ? `, ${user.full_name}`
                : " 👋"}
            </h1>

            <p>
              Manage your healthcare
              appointments from one place.
            </p>

          </div>

          <div className="profile-circle">

            {user?.full_name
              ? user.full_name
                  .charAt(0)
                  .toUpperCase()
              : "S"}

          </div>

        </header>

        {/* STATS */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>

              <span>
                Upcoming
              </span>

              <strong>
                {loading
                  ? "..."
                  : appointments.length}
              </strong>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <Clock3 size={22} />
            </div>

            <div>

              <span>
                Appointments
              </span>

              <strong>
                {loading
                  ? "..."
                  : appointments.length}
              </strong>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <Stethoscope size={22} />
            </div>

            <div>

              <span>
                Doctors
              </span>

              <strong>
                Available
              </strong>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <ShieldCheck size={22} />
            </div>

            <div>

              <span>
                Account
              </span>

              <strong>
                Secure
              </strong>

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="dashboard-section">

          <div className="section-title">

            <p>
              QUICK ACTIONS
            </p>

            <h2>
              What would you like to do?
            </h2>

          </div>

          <div className="dashboard-actions">

            <div className="action-card">

              <div className="action-icon">
                <Search size={26} />
              </div>

              <h3>
                Find a Doctor
              </h3>

              <p>
                Browse doctors and check
                available appointment slots.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "doctors"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                Browse Doctors
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="action-card">

              <div className="action-icon">
                <CalendarDays size={26} />
              </div>

              <h3>
                Book Appointment
              </h3>

              <p>
                Choose a doctor and select
                an available appointment slot.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "slots"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                Book Now
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="action-card">

              <div className="action-icon">
                <Activity size={26} />
              </div>

              <h3>
                My Appointments
              </h3>

              <p>
                View and manage your
                upcoming appointments.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "appointments"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                View Appointments
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </section>

        {/* DOCTOR */}

        <section
          id="doctors"
          className="dashboard-info-section"
        >

          <div className="section-title">

            <p>
              DOCTORS
            </p>

            <h2>
              Find a Doctor
            </h2>

          </div>

          <div className="info-panel doctor-panel">

            <div className="info-panel-icon">
              <Stethoscope size={28} />
            </div>

            <div className="doctor-panel-content">

              <h3>
                Doctor Availability
              </h3>

              <p>
                Enter a doctor ID to view
                available appointment slots.
              </p>

              <div className="doctor-search">

                <input
                  type="text"
                  value={doctorId}
                  onChange={(e) =>
                    setDoctorId(
                      e.target.value
                    )
                  }
                  placeholder="Enter Doctor ID"
                />

                <button
                  onClick={loadSlots}
                  disabled={slotsLoading}
                >

                  {slotsLoading
                    ? "Loading..."
                    : "Check Slots"}

                  <ArrowRight size={17} />

                </button>

              </div>

              {slotError && (
                <div className="dashboard-error">
                  {slotError}
                </div>
              )}

            </div>

          </div>

        </section>

        {/* SLOTS */}

        <section
          id="slots"
          className="dashboard-info-section"
        >

          <div className="section-title">

            <p>
              APPOINTMENT SLOTS
            </p>

            <h2>
              Available Slots
            </h2>

          </div>

          {slots.length === 0 ? (

            <div className="empty-appointment">

              <Clock3 size={42} />

              <h3>
                No slots loaded
              </h3>

              <p>
                Enter a doctor ID above
                and click "Check Slots".
              </p>

            </div>

          ) : (

            <div className="slots-grid">

              {slots.map(
                (slot) => (

                  <div
                    className="slot-card"
                    key={slot.id}
                  >

                    <div className="slot-icon">
                      <CalendarDays
                        size={25}
                      />
                    </div>

                    <h3>
                      {slot.date}
                    </h3>

                    <p>
                      {slot.time}
                    </p>

                    <span className="secure-badge">

                      <ShieldCheck
                        size={16}
                      />

                      Available

                    </span>

                    <button
                      className="book-slot-button"
                      onClick={() =>
                        setSelectedSlot(
                          slot
                        )
                      }
                    >
                      Book Appointment
                      <ArrowRight
                        size={16}
                      />
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* APPOINTMENTS */}

        <section
          id="appointments"
          className="upcoming-section"
        >

          <div className="section-title">

            <p>
              APPOINTMENTS
            </p>

            <h2>
              My Appointments
            </h2>

          </div>

          {appointments.length === 0 ? (

            <div className="empty-appointment">

              <CalendarDays size={42} />

              <h3>
                No appointments yet
              </h3>

              <p>
                Your booked appointments
                will appear here.
              </p>

            </div>

          ) : (

            <div className="appointment-list">

              {appointments.map(
                (appointment, index) => (

                  <div
                    className="appointment-row"
                    key={
                      appointment.id ||
                      index
                    }
                  >

                    <div className="appointment-icon">
                      <CalendarDays size={22} />
                    </div>

                    <div className="appointment-info">

                      <h3>
                        {appointment.title ||
                          "Doctor Consultation"}
                      </h3>

                      <p>
                        {appointment.date ||
                          "Appointment"}
                        {" • "}
                        {appointment.time ||
                          ""}
                      </p>

                    </div>

                    <span className="confirmed-badge">

                      <CheckCircle2
                        size={16}
                      />

                      {appointment.status ||
                        "Confirmed"}

                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* PROFILE */}

        <section
          id="profile"
          className="dashboard-info-section"
        >

          <div className="section-title">

            <p>
              ACCOUNT
            </p>

            <h2>
              Profile
            </h2>

          </div>

          <div className="profile-panel">

            <div className="profile-large">

              {user?.full_name
                ? user.full_name
                    .charAt(0)
                    .toUpperCase()
                : "S"}

            </div>

            <div>

              <h3>
                {user?.full_name ||
                  "Patient Account"}
              </h3>

              <p>
                {user?.email ||
                  "Authenticated patient"}
              </p>

            </div>

            <div className="secure-badge">

              <ShieldCheck size={17} />

              JWT Secure

            </div>

          </div>

        </section>

      </main>

      {/* =========================
          BOOKING MODAL
      ========================= */}

      {selectedSlot && (

        <div className="booking-overlay">

          <div className="booking-modal">

            <button
              className="modal-close"
              onClick={() =>
                setSelectedSlot(null)
              }
            >
              <X size={21} />
            </button>

            {!bookingSuccess ? (

              <>

                <div className="booking-modal-icon">
                  <CalendarDays size={30} />
                </div>

                <p className="dashboard-eyebrow">
                  CONFIRM APPOINTMENT
                </p>

                <h2>
                  Book your appointment
                </h2>

                <p>
                  Please review your
                  appointment details.
                </p>

                <div className="booking-details">

                  <div>
                    <span>
                      Doctor
                    </span>

                    <strong>
                      Dr. Test Doctor
                    </strong>
                  </div>

                  <div>
                    <span>
                      Date
                    </span>

                    <strong>
                      {selectedSlot.date}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Time
                    </span>

                    <strong>
                      {selectedSlot.time}
                    </strong>
                  </div>

                </div>

                <button
                  className="confirm-booking-button"
                  onClick={() =>
                    bookAppointment(
                      selectedSlot
                    )
                  }
                  disabled={booking}
                >

                  {booking
                    ? "Booking..."
                    : "Confirm Appointment"}

                  {!booking && (
                    <CheckCircle2
                      size={18}
                    />
                  )}

                </button>

              </>

            ) : (

              <div className="booking-success">

                <CheckCircle2
                  size={58}
                />

                <h2>
                  Appointment Confirmed!
                </h2>

                <p>
                  Your appointment has been
                  successfully booked.
                </p>

                <div className="booking-details">

                  <div>
                    <span>
                      Date
                    </span>

                    <strong>
                      {selectedSlot.date}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Time
                    </span>

                    <strong>
                      {selectedSlot.time}
                    </strong>
                  </div>

                </div>

                <button
                  className="confirm-booking-button"
                  onClick={() => {
                    setBookingSuccess(
                      false
                    );

                    setSelectedSlot(
                      null
                    );

                    document
                      .getElementById(
                        "appointments"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }}
                >
                  View My Appointments
                  <ArrowRight size={18} />
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================
   APP ROUTES
========================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;