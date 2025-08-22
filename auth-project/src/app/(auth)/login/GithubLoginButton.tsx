import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function GithubLoginButton() {
  return (
    <Button className="flex items-center gap-2">
      <Github className="w-5 h-5" />
      Sign In With GitHub
    </Button>
  );
}
