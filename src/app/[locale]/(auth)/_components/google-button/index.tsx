"use client";

import { googleSignInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

export const GoogleButton = () => {
  const t = useTranslations("Auth");
  const locale = useLocale();

  return (
    <Button
      onClick={async () => await googleSignInAction()}
      type="button"
      variant="outline"
      className={cn(locale === "ar" && "flex-row-reverse", "w-full")}
    >
      <FcGoogle className="size-4" />
      {t("google")}
    </Button>
  );
};
