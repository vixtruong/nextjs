"use server";
import { signIn } from "@/auth";

export const signInOAuth = async (provider: string) => {
  await signIn(provider, {
    redirectTo: `/oauth-callback?provider=${provider}`,
  });
};
