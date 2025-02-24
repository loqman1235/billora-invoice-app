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
import { useLocale, useTranslations } from "next-intl";

type Props = {
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
};

export const UserAvatar = ({ name, image, email }: Props) => {
  const t = useTranslations("Navbar");
  const locale = useLocale();

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
      <DropdownMenuContent
        align={locale === "ar" ? "start" : "end"}
        className="w-56"
      >
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-semibold">{name || "User"}</span>
          <span className="text-xs text-muted-foreground">
            {email || "No email"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 size-4" />
          {t("AvatarDropdown.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 size-4" />
          {t("AvatarDropdown.billing")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 size-4" />
          {t("AvatarDropdown.team")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOutAction}
          className="text-destructive hover:bg-red-50"
        >
          <LogOutIcon className="mr-2 size-4" />
          {t("AvatarDropdown.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
