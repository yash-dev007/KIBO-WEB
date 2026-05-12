# Contributing to KIBO Companion Web Interface

First off, thank you for considering contributing to KIBO! It's people like you that make KIBO such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. We ask that you be respectful and considerate of others, ensuring a welcoming environment for everyone.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Local Setup
1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/KIBO-WEB.git
   ```
2. Navigate to the project directory and install dependencies:
   ```bash
   cd KIBO-WEB
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

- **Architecture**: We use Next.js 14 (App Router). Ensure components are placed in the correct directories (`app/` for pages/layouts, `components/ui/` for shared UI elements).
- **Styling**: We strictly use Tailwind CSS. Ensure any new classes respect the 1:1 pixel-perfect requirement of the Atelier Zero design system. Do not introduce arbitrary colors or fonts outside of what is defined in `tailwind.config.ts`.
- **Animations**: Use the custom `<Reveal>` wrapper powered by Framer Motion for any scroll-based entrance animations.

## Committing Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

Format your commit messages as follows:
`<type>: <description>`

Examples:
- `feat: add new labs experiment component`
- `fix: correct text clipping on mobile viewports`
- `docs: update setup instructions`
- `style: adjust padding on hero section`

## Submitting a Pull Request

1. Create a new branch from `main`: `git checkout -b feature/your-feature-name`
2. Make your changes and commit them using the conventional commits format.
3. Push your branch to your fork: `git push origin feature/your-feature-name`
4. Open a Pull Request against the `main` branch of the original repository.
5. In your PR description, please include:
   - A summary of the changes.
   - Any related issue numbers.
   - Instructions on how to test the changes visually or functionally.

We will review your PR as soon as possible. Thank you for your contribution!