import { ModeToggle } from "@/components/mode-toggle";
import SignOutButton from "@/components/sign-out-button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
