export function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Hi, I&apos;m Yens 👋</h1>
      <p className="mt-4 max-w-prose text-gray-600 dark:text-gray-400">
        This portfolio doubles as my interview-prep playground. Each section is
        a complete, end-to-end feature built with a different part of the React
        ecosystem — plain state, TanStack Query, Redux Toolkit, Zustand, and
        React Hook Form.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <a
          href="https://github.com/yferrero/devfolio"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Source on GitHub
        </a>
        <a
          href="https://github.com/yferrero/devfolio/blob/main/ARCHITECTURE.md"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Architecture notes
        </a>
      </div>
    </section>
  )
}
