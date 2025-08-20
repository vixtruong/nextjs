"use server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <h1>Next Auth</h1>
        <p>Username: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <Image
          width={100}
          height={100}
          src={session.user.image ?? ""}
          alt="askds"
        ></Image>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href={"/login"}>Login</Link>
        <Button>Navigate to Login</Button>
      </main>
    </div>
  );
}
