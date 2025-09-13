"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between py-4">
      <nav className="flex items-center gap-4">
        <Link className="font-semibold" href="/">Home</Link>
        <Link href="/campaigns">Campaigns</Link>
        <Link href="/segments">Segments</Link>
      </nav>
      <div>
        {status === "loading" ? (
          <span className="text-gray-500">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">{session.user?.name}</span>
            <button className="px-3 py-1 border rounded" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
          </div>
        ) : (
          <button className="px-3 py-1 border rounded" onClick={() => signIn("google")}>Sign in</button>
        )}
      </div>
    </header>
  );
}


