import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Stethoscope,
  CalendarDays,
  ShieldCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";

import "./App.css";

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

          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="register-button">
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
              Book appointments, manage doctor availability, and keep track
              of your healthcare journey — all in one secure platform.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-button">
                Book an Appointment
                <ArrowRight size={18} />
              </Link>

              <Link to="/login" className="secondary-button">
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

        <section id="features" className="features-section">
          <div className="section-heading">
            <p>WHY CHOOSE US</p>
            <h2>Everything you need for easier healthcare</h2>
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

        <section id="how-it-works" className="workflow">
          <div className="section-heading">
            <p>HOW IT WORKS</p>
            <h2>Healthcare appointments in three simple steps</h2>
          </div>

          <div className="steps">
            <Step number="01" title="Create an account" />
            <Step number="02" title="Choose a doctor & slot" />
            <Step number="03" title="Confirm your appointment" />
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

        <p>© 2026 Healthcare Appointment Manager</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({ number, title }) {
  return (
    <div className="step">
      <span>{number}</span>
      <h3>{title}</h3>
    </div>
  );
}

function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
        "https://healthcare-appointment-manager-sz8l.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Save JWT token
      localStorage.setItem("access_token", data.access_token);

      alert("Login successful! 🎉");

      // For now, return to home
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Stethoscope size={40} />

        <h1>Welcome back</h1>

        <p>Sign in to manage your appointments.</p>

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

        <Link to="/">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Stethoscope size={40} />
        <h1>Create your account</h1>
        <p>Start managing your healthcare appointments.</p>

        <input type="text" placeholder="Full name" />
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />

        <select defaultValue="">
          <option value="" disabled>
            Select your role
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button>Create Account</button>

        <Link to="/">← Back to home</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;