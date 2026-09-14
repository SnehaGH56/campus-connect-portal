# 🎓 Campus Connect Portal

> A modern, integrated web platform engineered for RV University to unify student resources, faculty collaboration, and academic management into one cohesive ecosystem.

---

## 📌 Executive Summary

**Campus Connect Portal** serves as the digital backbone for university interactions. By centralizing daily academic routines, departmental notifications, and role-driven access, the platform bridges communication gaps among students, professors, and university administrators.

Built with a fast, component-driven frontend powered by **React 19** and **Vite**, along with an **Express / Node.js** backend architecture, the application delivers exceptional performance, real-time interactivity, and fluid responsive design across desktop and mobile devices.

---

## ⚡ Core Capabilities

### 🔹 Unified Navigation & Institutional Identity
- Official **RV University** branding with header badge and direct navigation shortcuts.
- Dynamic navigation controls for instant access to login portals and onboarding flows.

### 🔹 Campus Life & Highlights Showcase
- High-resolution visual tour featuring modern university labs, collaborative learning spaces, and academic infrastructure.
- Interactive carousel slider with touch-friendly navigation controls and active pagination indicators.

### 🔹 Role-Specific Workflows
The platform provides custom-tailored environments according to academic roles:
- **Student Dashboard**: Real-time event notifications, assignment submissions, schedule tracking, and profile customization.
- **Faculty Hub**: Course announcements, assignment authoring, attendance evaluation, and student submission tracking.
- **Administrative Console**: Student/staff registry management, institution-wide alerts, system auditing, and reporting.

### 🔹 Modern Authentication Suite
- Seamless tabbed interface allowing users to switch between **Sign In** and **New Account Registration**.
- Form state validation tailored for university email credentials (`@rvu.edu.in`).

---

## 🏗️ System Architecture

```text
campus-connect-portal/
├── client/                     # Frontend Application
│   ├── public/                 # Static web assets & icons
│   ├── src/
│   │   ├── assets/             # Campus photography & graphics
│   │   ├── components/         # Reusable React components (AuthModule, etc.)
│   │   ├── carousel.js         # Carousel slider engine
│   │   ├── style.css           # Global typography & responsive styling
│   │   ├── App.jsx             # Top-level React container
│   │   └── main.jsx            # Application mount point
│   ├── index.html              # Core HTML structure & portal views
│   ├── package.json            # Client dependencies & scripts
│   └── vite.config.js          # Vite build configuration
│
├── server/                     # Backend API Service
│   ├── src/
│   │   ├── config/             # Database connectivity & environment configs
│   │   ├── controllers/        # Request handlers & domain logic
│   │   ├── middleware/         # Authentication & validation layers
│   │   ├── models/             # Schema definitions
│   │   ├── routes/             # RESTful API endpoints
│   │   └── app.js              # Server bootstrapper
│   └── package.json            # Server dependencies & scripts
│
└── README.md                   # Project documentation
```

---

## 🛠️ Technology Ecosystem

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, JavaScript (ES6+), Vite Bundler |
| **Design & UI** | Responsive CSS3, Semantic HTML5, CSS Flexbox & Grid |
| **Backend & Runtime** | Node.js, Express.js |
| **Networking & State** | Axios, React Hooks (`useState`) |
| **Version Control** | Git, GitHub |

---

## 🚀 Installation & Local Development

### 1. Clone Repository
```bash
git clone https://github.com/SnehaGH56/campus-connect-portal.git
cd campus-connect-portal
```

### 2. Configure & Run Client
Open a terminal window:
```bash
cd client
npm install
npm run dev
```
The client will start locally at `http://localhost:5173`.

### 3. Configure & Run Server
Open a second terminal window:
```bash
cd server
npm install
npm run dev
```
The server will initialize on its designated local port.

---

## 📋 Course Information

- **Course**: CS3301 - Full Stack Development
- **Institution**: RV University, School of Computer Science & Engineering
- **Academic Year**: 2026

---

<sub>&copy; 2026 RV University. All rights reserved. Campus Connect Portal.</sub>
