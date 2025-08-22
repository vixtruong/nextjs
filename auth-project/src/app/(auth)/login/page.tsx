import { LoginForm } from "@/app/(auth)/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <LoginForm />
    </div>
  );
}
