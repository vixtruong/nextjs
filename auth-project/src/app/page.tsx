import LogoutButton from "@/app/(auth)/LogoutButton";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <h1>Next Auth</h1>
        <p>Username: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
      </div>
    );
  }

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 min-w-screen">
        <Button>
          <Link href={""}>Home</Link>
        </Button>
        <LogoutButton />
      </div>
    </main>
  );
}
