"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Github } from "lucide-react";

export default function GithubLoginButton() {
  const { githubLogin } = useAuth();

  return (
    <Button onClick={githubLogin} className="flex items-center gap-2">
      <Github className="w-5 h-5" />
      Sign In With GitHub
    </Button>
  );
}
