import { auth } from "@/auth";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OAuthCallbackPage({ searchParams }: PageProps) {
  // Next 15: searchParams là Promise, cần await
  const sp = await searchParams;

  const provider =
    typeof sp?.provider === "string"
      ? sp.provider
      : Array.isArray(sp?.provider)
      ? sp.provider[0]
      : undefined;

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // An toàn hơn khi truy cập session.user
  const email = session.user?.email ?? "";
  const fullName = session.user?.name ?? "";
  const avatarUrl = session.user?.image ?? "";

  const query = new URLSearchParams({
    email,
    fullName,
    avatarUrl,
    provider: provider ?? "",
  });

  redirect(`/oauth-success?${query.toString()}`);
}
