export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Portfolio Site Builder</h1>
      <p className="text-gray-600">
        Dashboard placeholder. Add auth + a list of the user&apos;s sites here.
      </p>
      <a href="/editor" className="text-blue-600 underline">
        Go to editor →
      </a>
    </main>
  );
}
