"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 mb-5"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      Back
    </Button>
  );
};
