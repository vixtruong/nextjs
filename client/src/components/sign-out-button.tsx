"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
