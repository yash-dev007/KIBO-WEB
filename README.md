<div align="center">

# **KIBO Companion Web Interface**

### A visually stunning, award-winning inspired single-page website for KIBO—the desktop companion.

<br/>

[![Stars](https://img.shields.io/github/stars/yash-dev007/KIBO-WEB?style=flat-square&color=FFD700&labelColor=1a1a1a)](https://github.com/yash-dev007/KIBO-WEB/stargazers)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square&labelColor=1a1a1a)](LICENSE)
[![Contributing](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&color=FF69B4&labelColor=1a1a1a)](CONTRIBUTING.md)
[![Vite](https://img.shields.io/badge/Vite-6.4%2B-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a1a)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-18.3%2B-61DAFB?style=flat-square&logo=react&logoColor=black&labelColor=1a1a1a)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12%2B-88CE02?style=flat-square&logo=greensock&logoColor=white&labelColor=1a1a1a)](https://gsap.com/)

<br/>

> **This is the beautiful, highly interactive frontend marketing and informational interface for KIBO. Built with pixel-perfect attention to detail, smooth scroll triggers, and high-fidelity transitions to match the aesthetic and philosophy of the KIBO desktop companion itself.**

<br/>

</div>

---

## 🚀 Tech Stack

The application utilizes a cutting-edge React single-page architecture optimized for ultra-smooth rendering, custom clip-paths, and state-of-the-art interactive transitions.

- **Build Tool**: [Vite 6](https://vite.dev/) (Ultra-fast Hot Module Replacement)
- **Library**: [React 18](https://react.dev/)
- **Animation**: [GSAP](https://gsap.com/) (GreenSock Animation Platform) + `@gsap/react`
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

---

## ✨ Key Features

- **GSAP Scroll-Triggered Clip Paths**: Features smooth, scroll-bound geometric mask transitions where background visuals expand dynamically to cover the viewport.
- **Micro-Animations & Interactive Bentos**: Beautiful 3D hover states, interactive cards, and responsive Bento grids with magnetic pull effects.
- **Glassmorphic Design & HSL Color System**: curates harmonious dark modes, smooth typography (General Sans, Zentry font features), and sleek indicator lines.
- **High-Performance Audio & Video Layouts**: Seamlessly integrated, lightweight visual loaders and media streaming players.

---

## 📦 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and npm installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yash-dev007/KIBO-WEB.git
   cd KIBO-WEB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
KIBO WEB/
├── src/
│   ├── components/            # Reusable UI components (About, AnimatedTitle, Hero, etc.)
│   ├── assets/                # Local visual, image, and font resources
│   ├── App.jsx                # Main single-page application orchestrator
│   ├── index.css              # Custom Tailwind directives and layer extensions
│   └── main.jsx               # React client entry point
├── public/                    # Static assets directly served by Vite (icons, videos, raw WebMs)
├── tailwind.config.js         # Core layout spacing, bespoke font-families, and brand colors
├── vite.config.js             # Vite configuration with React support
└── package.json               # Dependencies and command-line lifecycle scripts
```

---

## 🤝 Contributing

Contributions are highly appreciated! Please review our detailed contribution guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file at the root of the repository before submitting issues or pull requests.

---

## 📄 License

This project is licensed under the Apache License 2.0. See the full license details in the [LICENSE](LICENSE) file at the root of the repository.

© 2026 Yash
