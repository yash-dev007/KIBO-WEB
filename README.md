# KIBO Companion Web Interface

<img src="./public/assets/Hero_Img.png" alt="KIBO Banner" width="600" />

> **A persistent digital life · Reactive · Evolving · Personal · Memory**

KIBO is a next-generation desktop companion interface. It is designed for deep integration, serving as a persistent, reactive, and evolving partner in your creative process. Built on the Atelier Zero editorial system, KIBO indexes your workflow, anticipates your needs, and builds a long-term memory of your creative preferences.

This repository contains the front-end marketing and informational website for KIBO, beautifully crafted to match the aesthetic and philosophy of the companion itself.

## 🚀 Tech Stack

The application has been meticulously migrated from a static HTML page to a modern, scalable architecture while maintaining a 1:1 pixel-perfect visual identity.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## ✨ Features

- **Pixel-Perfect Fidelity**: Custom Tailwind configuration flawlessly replicates the exact color palette, typography (Inter, Playfair Display, JetBrains Mono), and paper-texture styling of the original Atelier Zero design system.
- **Component-Driven Architecture**: The single-page layout has been intelligently splintered into scalable Next.js routes (`/about`, `/capabilities`, `/labs`, `/method`, `/work`).
- **Performant Animations**: Vanilla JavaScript scroll observers have been replaced with a reusable, highly performant `<Reveal>` wrapper powered by Framer Motion's `whileInView`. Infinite ticker animations utilize native CSS keyframes.
- **Responsive Layouts**: Fully responsive grid structures that adapt elegantly from ultra-wide desktop monitors down to mobile viewports.

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
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Build for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 📂 Project Structure

- `app/`: Next.js App Router pages and global layouts.
  - `globals.css`: Core CSS resets, variables, and the custom paper texture.
  - `layout.tsx`: The application shell containing SideRails, Topbar, StickyNav, and Footer.
- `components/ui/`: Reusable React components (Navigation, Footer, Reveal animations).
- `public/assets/`: Static assets including images and icons.
- `docs/superpowers/`: Engineering documentation, architecture plans, and spec sheets.

## 📄 License

This project is proprietary software belonging to KIBO Studio (2026). All rights reserved.