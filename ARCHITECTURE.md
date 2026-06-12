# Architecture

A portfolio app that doubles as an interview-prep playground. Each feature is
a **complete vertical slice** — UI, state, and data fetching live together in
one folder — and each feature deliberately uses a **different state approach**
so the codebase is a side-by-side comparison of the React ecosystem.

## Structure

```
src/
├── app/          # App shell: router, layout, home, 404
├── components/   # Shared, dumb UI (Spinner, ...). No business logic.
├── lib/          # Shared utilities (api wrapper, ...). No React.
├── test/         # Test setup
└── features/     # One folder per feature, self-contained
```

## Rules

1. **Features never import from each other.** They may import from
   `components/`, `lib/`, and their own files only. One deliberate
   exception: the Redux store is app-level wiring (`app/store.ts`), so
   Redux-using features import the pre-typed `useAppSelector` /
   `useAppDispatch` hooks from there — the slice itself still lives in
   the feature.
2. **Each feature exposes a public API via `index.ts`.** Pages are default
   exports (for `lazy()`); everything else is internal.
3. **One state library per feature** — that's the point of the project:

   | Feature  | Approach                       | Why it fits                                  |
   |----------|--------------------------------|----------------------------------------------|
   | projects | `useState` + derived state     | Local UI state needs no library              |
   | github   | TanStack Query                 | Server state: caching, refetching, errors    |
   | notes    | Redux Toolkit                  | Complex client state, reducers, selectors    |
   | pomodoro | Zustand                        | Small global state without providers         |
   | contact  | React Hook Form + Zod          | Form state is its own category               |
   | theme    | Zustand + `persist`            | Tiny cross-cutting state                     |
   | performance | memo / useMemo / useCallback | Referential identity, and when memoization pays |

4. **Shared code is extracted only when a second consumer appears** — don't
   pre-build abstractions.

## Cross-cutting decisions

- **Routing**: React Router with `createBrowserRouter`; every feature page is
  lazy-loaded (one chunk per route).
- **Dark mode**: a `dark` class on `<html>` driven by the theme store
  (dark by default); Tailwind v4 custom variant in `index.css`, plus an
  anti-flash inline script in `index.html`.
- **Styling**: Tailwind utilities in JSX. Design tokens (violet `primary`
  palette, Inter font) live in the `@theme` block in `index.css`; the few
  classes repeated across every feature (`card`, `btn-primary`,
  `btn-outline`, `input`, `gradient-text`) are defined once there too.
- **Testing**: Vitest + React Testing Library; MSW intercepts HTTP in tests
  (`src/test/server.ts`), so fetching components are tested against the
  real fetch path with faked responses.
- **CI/CD**: GitHub Actions — lint, typecheck, test, build on every push/PR;
  deploy to GitHub Pages from `main`.
