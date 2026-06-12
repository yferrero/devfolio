# devfolio

Personal portfolio + interview-prep playground. Each feature is a complete,
end-to-end slice built with a different part of the React ecosystem, so the
repo works as a readable reference for interview practice.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the structure and rules.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router ·
Zustand · TanStack Query · Redux Toolkit · React Hook Form + Zod ·
Vitest + React Testing Library

## Scripts

| Command              | What it does                       |
|----------------------|------------------------------------|
| `npm run dev`        | Start the dev server               |
| `npm run build`      | Typecheck + production build       |
| `npm run lint`       | ESLint                             |
| `npm run typecheck`  | TypeScript project check           |
| `npm test`           | Run tests once                     |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run preview`    | Preview the production build       |

## Roadmap

- [x] Phase 1 — Scaffold: Vite, Tailwind, Router, theme toggle (Zustand), CI/CD
- [x] Phase 2 — Projects gallery (plain React state, derived state, URL params)
- [x] Phase 3 — API layer + GitHub feed (TanStack Query, error boundary)
- [x] Phase 4 — Notes / flashcards (Redux Toolkit)
- [x] Phase 5 — Pomodoro timer (Zustand, timers, effect cleanup)
- [x] Phase 6 — Contact form (React Hook Form + Zod)
- [ ] Phase 7 — Tests for all features (Vitest, RTL, MSW)
- [ ] Phase 8 — Polish: performance page, deploy
