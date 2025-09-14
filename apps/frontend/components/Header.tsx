"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <Link 
            className="text-lg font-bold text-gray-900 hover:text-gray-700 transition-colors" 
            href="/"
          >
            Xeno CRM
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                isActive('/') ? 'text-gray-900' : 'text-gray-600'
              }`}
              href="/"
            >
              Dashboard
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                isActive('/ingestion') ? 'text-gray-900' : 'text-gray-600'
              }`}
              href="/ingestion"
            >
              Data Upload
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                isActive('/campaigns') ? 'text-gray-900' : 'text-gray-600'
              }`}
              href="/campaigns"
            >
              Campaigns
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                isActive('/segments') ? 'text-gray-900' : 'text-gray-600'
              }`}
              href="/segments"
            >
              Segments
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center space-x-3">
          {status === "loading" ? (
            <div className="h-4 w-4 animate-pulse bg-gray-200 rounded"></div>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-900">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-gray-600">{session.user?.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button onClick={() => signIn("google")}>
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}


