import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = async () => {
  const session = await auth();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-5 p-5 text-center">
      <h1 className="text-4xl font-black tracking-tight md:text-7xl">
        Create. Send. Get Paid. <br />
        <span className="text-gradient">That Simple</span>
      </h1>
      <p className="max-w-[42rem] text-sm text-muted-foreground md:text-lg">
        Generate invoices in seconds, send them with a click, and receive
        payments without the hassle.
      </p>
      <Button size="lg" asChild>
        {session?.user ? (
          <Link href="/dashboard">
            Visit Dashboard <ArrowRight />
          </Link>
        ) : (
          <Link href="/sign-up">
            Start for Free <ArrowRight />
          </Link>
        )}
      </Button>
    </div>
  );
};
