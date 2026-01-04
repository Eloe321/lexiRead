"use client";

import { useEffect } from "react";
import { signIn } from "@/app/lib/auth/actions";
import { useForm } from "@/app/lib/hooks";
import { useAuthStore } from "@/app/lib/stores";
import { signInSchema, type SignInInput } from "@/app/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const {
    setLoading,
    setError,
    error: storeError,
    clearError,
  } = useAuthStore();

  const { errors, isSubmitting, handleSubmit } = useForm<typeof signInSchema>({
    schema: signInSchema,
    onSubmit: async (data: SignInInput) => {
      setLoading(true);
      clearError();

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signIn(formData);

      if (result?.error) {
        setError(result.error);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-4 py-4">
        <Link href="/" className="text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-sm mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Sign in to continue to your account
          </p>

          {storeError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {storeError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-500 font-medium hover:text-blue-600"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Lock className="h-4 w-4" />
          YOUR DATA IS ENCRYPTED AND STORED SECURELY
        </div>
      </div>
    </div>
  );
}
