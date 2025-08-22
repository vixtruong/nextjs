import { RegisterForm } from "@/app/(auth)/register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <RegisterForm />
    </div>
  );
}
