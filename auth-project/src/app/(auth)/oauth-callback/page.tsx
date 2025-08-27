import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { provider?: string };
}

export default async function OAuthCallbackPage({ searchParams }: Props) {
  const provider = searchParams.provider;

  console.log("provider", provider);

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const query = new URLSearchParams({
    email: session.user!.email!,
    fullName: session.user!.name!,
    provider: provider!,
  });

  redirect(`/oauth-success?${query.toString()}`);
}
