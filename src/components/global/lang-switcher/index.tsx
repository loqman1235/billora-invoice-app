"use client";

import { usePathname, useRouter } from "@/i18n/routing";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // shadcn/ui Dropdown
import { CheckIcon, GlobeIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export const LangSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const supportedLangs = [
    {
      locale: "en",
      name: "English",
    },
    {
      locale: "ar",
      name: "العربية",
    },
    {
      locale: "fr",
      name: "Français",
    },
  ];

  const handleLangChange = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <GlobeIcon className="size-6" /> {/* Globe icon */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={currentLocale === "ar" ? "start" : "end"}
        className="w-40"
      >
        {supportedLangs.map((lang) => (
          <DropdownMenuItem
            key={lang.locale}
            onClick={() => handleLangChange(lang.locale)}
            className="flex cursor-pointer items-center justify-between"
          >
            {lang.name}
            {currentLocale === lang.locale && (
              <CheckIcon className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
