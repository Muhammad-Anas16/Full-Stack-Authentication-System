"use client"; // Add this for Next.js client component

import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});



const signInWithEmail = async (email: string, password: string) => {
  await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: "/",
      rememberMe: false,
    },
    {
      onRequest: (ctx) => {
        toast("Logging your account...");
      },
      onSuccess: (ctx) => {
        // Handle 2FA redirect if needed
        if (ctx.data.twoFactorRedirect) {
          // Handle the 2FA verification
          toast("Please complete two-factor authentication");
          return;
        }
        toast.success("Sign In successfully!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );
};

const SignInGoogle = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    errorCallbackURL: "/auth/register",
    newUserCallbackURL: "/",
    disableRedirect: true,
  });

  if (data?.url) {
    redirect(data.url);
  }
};

const SignOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        redirect("/auth/login");
      },
    },
  });
};

export { signInWithEmail ,SignInGoogle, SignOut };
