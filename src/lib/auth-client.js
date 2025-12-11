"use client";

import { createAuthClient } from "better-auth/react";
import { toast } from "react-toastify";

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://full-stack-authentication-system-pi.vercel.app" 
    : "http://localhost:3000"
});


const SignUpWithEmail = async (email, password, username) => {
    try {
        const { data, error } = await authClient.signUp.email(
            {
                name: username,
                email: email,
                password: password,
                callbackURL: "/",
            },
            {
                onRequest: (ctx) => {
                    console.log("auth-client onRequest line 21 ", ctx);
                    toast.info("Creating your account...");
                },
                onSuccess: (ctx) => {
                    console.log("checking data on SignUp when on success", ctx.data);
                    // toast.success("Account created successfully!");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            }
        );
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const signInWithEmail = async (email, password, shouldRemember = true) => {
    try {
        const { data, error } = await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/",
                rememberMe: shouldRemember,
            },
            {
                onRequest: (ctx) => {
                    console.log("auth-client onRequest", ctx);
                    toast.info("Logging in to your account...");
                },
                onSuccess: (ctx) => {
                    console.log("checking data on SignIn when on success", ctx.data);
                    toast.success("Sign In successfully!");
                },
                onError: (ctx) => {
                    console.log("Sign in error:", ctx.error.message);
                    toast.error(ctx.error.message);
                },
            }
        );

        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data };

    } catch (networkError) {
        toast.error("Network error: " + networkError.message);
        return { success: false, error: networkError.message };
    }
};

const SignInGoogle = async () => {
    try {
        const { data, error } = await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/",
                errorCallbackURL: "/auth/register",
                newUserCallbackURL: "/",
                disableRedirect: true,
            },
            {
                onRequest: (ctx) => {
                    console.log("auth-client onRequest Google sign-in ", ctx.data.message || ctx.message);
                    toast.info(ctx.data.message || "Signing in with Google...");
                },
                onSuccess: (ctx) => {
                    console.log("checking data on Google SignIn when on success", ctx.data.message || ctx.message);
                    // toast.success("Google sign in successful!");
                    toast.success(ctx.data.message || "Google sign in successful!");
                },
                onError: (ctx) => {
                    console.log(ctx.data.message || ctx.message);
                    toast.error(ctx.error.message || ctx.message || "Google sign-in failed.");
                },
            }
        );

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const SignInGithub = async () => {
    try {
        const { data, error } = await authClient.signIn.social(
            {
                provider: "github",
                callbackURL: "/",
                errorCallbackURL: "/auth/register",
                newUserCallbackURL: "/",
                disableRedirect: true,
            },
            {
                onRequest: (ctx) => {
                    console.log("auth-client onRequest GitHub sign-in ", ctx.data.message || ctx.message);
                    toast.info(ctx.data.message || ctx.message || "Signing in with GitHub...");
                },
                onSuccess: (ctx) => {
                    console.log("checking data on GitHub SignIn when on success", ctx.data.message || ctx.message);
                    // toast.success("GitHub sign in successful!");
                    console.log(ctx.message || ctx.data.message || "GitHub sign-in successful");
                },
                onError: (ctx) => {
                    console.log(ctx.data.message || ctx.message);
                    toast.error(ctx.error.message || ctx.message || "GitHubgit  sign-in failed.");
                },
            }
        );

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const signOut = async () => {
    try {
        await authClient.signOut();
        toast.success("Signed out successfully!");
        return { success: true };
    } catch (error) {
        toast.error("Error signing out: " + (error.message || "Something went wrong"));
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const forgetPassword = async (email) => {
    try {
        const { data, error } = await authClient.forgetPassword({
            email: email,
            redirectTo: "/auth/reset-password"
        });
        
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const getSession = async () => {
    try {
        const { data: session, error } = await authClient.getSession();
        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true, session };
    } catch (error) {
        return { success: false, error: error.message || "Something went wrong" };
    }
};

const useSession = () => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession();

    return { session, isPending, error, refetch };
};

export {
    SignUpWithEmail,
    signInWithEmail,
    SignInGoogle,
    SignInGithub,
    signOut,
    forgetPassword,
    getSession,
    useSession
};