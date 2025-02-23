"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle, CheckIcon, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyEmailTokenAction } from "@/actions/auth";

export const VerifyEmailForm = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const result = await verifyEmailTokenAction(token);

        if (result.success && result.message) {
          setStatus("success");
          setMessage(result.message);

          setTimeout(() => {
            router.push("/sign-in");
          }, 3000);
        }

        if (result.error) {
          setStatus("error");
          setMessage(result.error);
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
        setMessage("Failed to verify email.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="size-10 animate-spin text-primary" />
          <p className="text-sm text-gray-600">Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-emerald-50 p-3 text-emerald-600">
            <CheckIcon className="size-8" />
          </span>
          <h2 className="text-xl font-bold text-emerald-600">Success!</h2>
          <p className="text-gray-700">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-red-50 p-3 text-red-600">
            <CircleAlert className="size-8" />
          </span>
          <h2 className="text-xl font-bold text-red-600">
            Verification Failed
          </h2>
          <p className="text-gray-700">{message}</p>
          <Button variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
