"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userInitial = userName?.charAt(0)?.toUpperCase() || "U";
  const userImage = typeof session?.user?.image === 'string' ? session.user.image : undefined;

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
            <Link 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground'
              }`}
              href="/about"
            >
              About Me
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {status === "loading" ? (
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border border-transparent px-2 py-1 hover:bg-accent">
                  <Avatar>
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">{userName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{userName}</span>
                    {!!userEmail && (
                      <span className="text-xs text-muted-foreground">{userEmail}</span>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/campaigns">My Campaigns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/segments">My Segments</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn("google")}>Sign in with Google</Button>
          )}
        </div>
      </div>
    </header>
  );
}


