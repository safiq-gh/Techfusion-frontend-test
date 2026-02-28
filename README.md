# 🚀 Techfusion Frontend

A modern, API-driven event registration platform built for a college tech fest. Designed with a futuristic UI and smooth animations, this application provides a seamless registration experience with payment integration and real-time validation.

---

## ✨ Features

- ⚡ API-driven architecture (strict backend contract)
- 🎨 Animated UI (Framer Motion + GSAP)
- 💳 UPI-based payment flow with QR support
- ✅ Real-time email validation
- 📊 Registration status tracking
- 📱 Fully responsive (mobile + desktop)
- 🔒 Form validation using Zod + React Hook Form

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion, GSAP
- **State Management:** Zustand
- **API Handling:** Axios
- **Form Handling:** React Hook Form + Zod

---

## 🔗 API Integration

This frontend strictly follows a backend API contract:

- `GET /event` → Fetch event details  
- `POST /register` → Submit registration  
- `GET /register/:id` → Check registration status  
- `GET /register/check` → Validate email  

---

## ⚙️ Run Locally

```bash
npm install
npm run dev