"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toastError } from "@/lib/ToastService";

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const email = searchParams.get("email") || "";
      const fullName = searchParams.get("fullName") || "";
      const provider = searchParams.get("provider") || "";
      const avatarUrl = searchParams.get("avatarUrl") || "";

      if (email && fullName) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/oauth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                fullName,
                avatarUrl,
                provider,
              }),
              credentials: "include",
            }
          );
          console.log(res);
          router.push("/");
        } catch (error) {
          toastError(error || "Login failed");
        }
      } else {
        toastError("Missing OAuth data");
      }
    };

    handleOAuthLogin();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <div>Sign In...</div>
    </div>
  );
}
