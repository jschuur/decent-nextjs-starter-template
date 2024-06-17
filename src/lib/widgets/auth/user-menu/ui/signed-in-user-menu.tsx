"use client";

import { HomePage, PrivatePage } from "@shared/config/routes";
import { signOut,User } from "@shared/services/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import Link from "next/link";
import { FC } from "react";

export interface SignedInUserMenuProps {
  user: User;
}

export const SignedInUserMenu: FC<SignedInUserMenuProps> = ({ user }) => {
  const home = HomePage(null);
  const dash = PrivatePage(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none data-[state=open]:border-none focus:ring-0 focus:ring-transparent focus:ring-offset-0">
        {user.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      >
        <DropdownMenuLabel className="flex flex-col">
          <div>{user.name}</div>
          <div className="text-[7pt] text-slate-500 font-normal">
            {user.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={home.url}>{home.label}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={dash.url}>{dash.label}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
