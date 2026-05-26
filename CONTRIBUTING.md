# Contributing to KIBO WEB

Thank you for your interest in contributing to KIBO WEB! We welcome and appreciate contributions of all kinds, whether you are fixing a bug, improving documentation, or proposing new features.

---

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Git Workflow & Commit Guidelines](#git-workflow--commit-guidelines)
6. [Submitting a Pull Request](#submitting-a-pull-request)

---

## Code of Conduct

By participating in this project, you agree to maintain a professional, friendly, and respectful environment for all contributors and maintainers.

---

## How to Contribute

### Reporting Bugs
- Search existing issues to ensure the bug hasn't been reported yet.
- Open a new issue with a clear title and description, including steps to reproduce, expected behavior, and screenshots or error logs where relevant.

### Suggesting Enhancements
- Open an issue explaining your proposed feature, the problem it solves, and potential implementation ideas.

---

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/KIBO-WEB.git
   cd KIBO-WEB
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to see the live site.

4. **Build and Lint**
   ```bash
   npm run build
   npm run lint
   ```

---

## Coding Standards

- **React & TypeScript/JavaScript**: Prefer modern, clean component structures. Keep components focused, reusable, and small (under 50 lines per function, under 800 lines per file).
- **Immutability**: Always return new objects/arrays instead of mutating existing ones in place.
- **Styling**: Use Tailwind CSS for utility styles and `src/index.css` for core design systems. Do not write inline styles.
- **GSAP Animations**: Group GSAP animations cleanly inside React component lifecycles using the `@gsap/react` hook (`useGSAP`). Ensure all triggers and targets are clean and performant.

---

## Git Workflow & Commit Guidelines

We enforce clean, atomic, and structured commit messages. 

### Commit Format
```
<emoji> <type>: <description>
```

| Emoji | Type | Description |
|---|---|---|
| ✨ | `feat` | A new feature |
| 🐛 | `fix` | A bug fix |
| ♻️ | `refactor` | Code change that neither fixes a bug nor adds a feature |
| 📝 | `docs` | Documentation only changes |
| ✅ | `test` | Adding missing tests or correcting existing tests |
| ⚡️ | `perf` | A code change that improves performance |
| 🔧 | `chore` | Changes to the build process or auxiliary tools/libraries |
| 🔒 | `security` | Security fix or package vulnerability upgrade |

- Commit message must be in the present tense, imperative mood, and under 72 characters (e.g., `✨ feat: add navigation menu transitions`).
- Ensure each commit represents a single atomic concern.

---

## Submitting a Pull Request

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes, keeping commits small and meaningful.
3. Verify that the build succeeds and there are no linting errors:
   ```bash
   npm run lint
   npm run build
   ```
4. Push your branch to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
5. Open a Pull Request against the main repository and fill out the PR description template.
