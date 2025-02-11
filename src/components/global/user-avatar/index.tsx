"use client";

import { signOutAction } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOutIcon, UserIcon, Users } from "lucide-react";

type Props = {
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
};

export const UserAvatar = ({ name, image, email }: Props) => {
  const initials = name ? name.slice(0, 1).toUpperCase() : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarFallback className="bg-[#5B6BC0] text-white">
            {initials}
          </AvatarFallback>
          <AvatarImage src={image} alt={name || "Avatar"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-semibold">{name || "User"}</span>
          <span className="text-xs text-muted-foreground">
            {email || "No email"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 size-4" />
          Team
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOutAction}
          className="text-destructive hover:bg-red-50"
        >
          <LogOutIcon className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
