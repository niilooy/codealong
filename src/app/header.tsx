"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data you have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{session?.user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function NavLink({ href, children } : {href: any, children: React.ReactNode}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <span
        className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
          isActive
            ? "text-primary border-primary"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

export function Header() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <span className="flex items-center space-x-2">
                <Image src="/logo.svg" width={80} height={80} alt="logo" />
              </span>
            </Link>
            {isLoggedIn && (
              <nav className="flex items-center space-x-4">
                <NavLink href="/browse">Browse Public Rooms</NavLink>
                <NavLink href="/your-rooms">Check Out Your Rooms</NavLink>
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <AccountDropdown />
            ) : (
              <Button onClick={() => signIn()} variant="ghost" size="sm">
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;