"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`-ml-3 mb-5 ${locale === "ar" && "flex-row-reverse"}`}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      {t("goBack")}
    </Button>
  );
};
