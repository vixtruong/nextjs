"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const { logout, logoutOAuth } = useAuth();

  const submitLogout = async () => {
    await logoutOAuth();
    await logout();

    redirect("/login");
  };

  return <Button onClick={submitLogout}>Logout</Button>;
}
