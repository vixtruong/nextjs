import GithubLoginButton from "@/app/(auth)/login/GithubLoginButton";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 min-w-screen">
      <div className="flex flex-col items-center w-[80%] md:w-[30%]">
        {children}
        <div className="mt-6 w-full flex justify-center">
          <GithubLoginButton />
        </div>
      </div>
    </div>
  );
}
