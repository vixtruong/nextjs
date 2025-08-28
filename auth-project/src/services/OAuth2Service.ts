"use server";
import { signIn, signOut } from "@/auth";

export const signInOAuth = async (provider: string) => {
  await signIn(provider, {
    redirectTo: `/oauth-callback?provider=${provider}`,
  });
};

export const signOutOAuth = async () => {
  await signOut({ redirectTo: "/" });
};
