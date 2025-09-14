"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center space-x-6">
          <Link 
            className="text-lg font-bold text-primary hover:text-primary/80 transition-colors" 
            href="/"
          >
            Xeno CRM
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
              href="/"
            >
              Dashboard
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/ingestion') ? 'text-primary' : 'text-muted-foreground'
              }`}
              href="/ingestion"
            >
              Data Upload
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/campaigns') ? 'text-primary' : 'text-muted-foreground'
              }`}
              href="/campaigns"
            >
              Campaigns
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/segments') ? 'text-primary' : 'text-muted-foreground'
              }`}
              href="/segments"
            >
              Segments
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {status === "loading" ? (
            <div className="h-4 w-4 animate-pulse bg-muted rounded"></div>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{session.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user?.email}</p>
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


