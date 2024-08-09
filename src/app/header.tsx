"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

// better make this into a separate component.
function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage
              src={session.data?.user?.image as string}
              alt="@shadcn"
            />
            <AvatarFallback>{session.data?.user?.name ?? ""}</AvatarFallback>
          </Avatar>
          {isLoggedIn ? session.data?.user?.name : `Sign In`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2" /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogIn className="mr-2" /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();
  return (
    // setup auth
    <header className="bg-gray-100 py-5 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <Link href={`/`} className="flex gap-2 items-center text-xl">
          <Image src="./logo.svg" alt="logo" width={80} height={80} />
        </Link>

        <div className="flex items-centergap-4">
          <AccountDropdown />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
