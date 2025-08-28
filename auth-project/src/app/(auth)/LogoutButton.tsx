"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout, logoutOAuth } = useAuth();

  const submitLogout = async () => {
    await logoutOAuth();
    await logout();
  };

  return <Button onClick={submitLogout}>Logout</Button>;
}
