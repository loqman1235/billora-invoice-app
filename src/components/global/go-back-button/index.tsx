"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const t = useTranslations("common");
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 mb-5"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      {t("goBack")}
    </Button>
  );
};
