import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container min-h-dvh py-16 flex flex-col items-center justify-center">
      <h1>Error 404 😥</h1>
      <p>Oops! The page you are looking for cannot be found.</p>
      <Link className="underline" href="/">Go back home</Link>
    </main>
  );
}