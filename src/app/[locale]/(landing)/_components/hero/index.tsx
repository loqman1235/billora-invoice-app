import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  locale: string;
};

export const HeroSection = async ({ locale }: Props) => {
  const session = await auth();
  const t = await getTranslations("LandingPage");

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-5 p-5 text-center">
      <h1 className="text-4xl font-black tracking-tight md:text-7xl">
        {t("HeroSection.title")} <br />
        <span className="text-gradient">{t("HeroSection.title2")}</span>
      </h1>
      <p className="max-w-[42rem] text-sm text-muted-foreground md:text-lg">
        {t("HeroSection.description")}
      </p>
      <Button size="lg" asChild>
        {session?.user ? (
          <Link
            href="/dashboard"
            className={cn(locale === "ar" && "flex-row-reverse")}
          >
            {t("HeroSection.button2")} <ArrowRight />
          </Link>
        ) : (
          <Link
            href="/sign-up"
            className={cn(locale === "ar" && "flex-row-reverse")}
          >
            {t("HeroSection.button")} <ArrowRight />
          </Link>
        )}
      </Button>
    </div>
  );
};
