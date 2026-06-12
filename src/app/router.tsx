import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Home'
import { NotFound } from './NotFound'

// Each feature page is lazy-loaded so the router demonstrates code splitting:
// every route becomes its own chunk (check the build output).
const ProjectsPage = lazy(() => import('@/features/projects'))
// lazy() needs a default export; for a named export, map it in the import.
const ProjectDetailPage = lazy(() =>
  import('@/features/projects').then((m) => ({ default: m.ProjectDetailPage })),
)
const GithubPage = lazy(() => import('@/features/github'))
const NotesPage = lazy(() => import('@/features/notes'))
const PomodoroPage = lazy(() => import('@/features/pomodoro'))
const ContactPage = lazy(() => import('@/features/contact'))
const PerformancePage = lazy(() => import('@/features/performance'))

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'projects/:id', element: <ProjectDetailPage /> },
        { path: 'github', element: <GithubPage /> },
        { path: 'notes', element: <NotesPage /> },
        { path: 'pomodoro', element: <PomodoroPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'performance', element: <PerformancePage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  // BASE_URL is "/" locally and "/<repo>/" on GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)
