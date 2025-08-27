import { LoginForm } from "@/app/(auth)/login/LoginForm";
import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">
        Sign In {session?.user?.email ?? "abc"}
      </h2>
      <LoginForm />
    </div>
  );
}
