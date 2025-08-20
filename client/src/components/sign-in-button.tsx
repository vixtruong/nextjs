"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

export default function SignInButton() {
  return (
    <form action={login}>
      <Button type="submit">Sign In With Github</Button>
    </form>
  );
}
