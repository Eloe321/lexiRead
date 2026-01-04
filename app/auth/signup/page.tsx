"use client";

import { useEffect } from "react";
import { signUp } from "@/app/lib/auth/actions";
import { useForm } from "@/app/lib/hooks";
import { useAuthStore } from "@/app/lib/stores";
import { signUpSchema, type SignUpInput, type Role } from "@/app/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  Smile,
  Shield,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const {
    setLoading,
    setError,
    error: storeError,
    clearError,
    selectedRole,
    setSelectedRole,
    registrationStep,
    setRegistrationStep,
  } = useAuthStore();

  const { errors, isSubmitting, handleSubmit, setFieldError } = useForm<
    typeof signUpSchema
  >({
    schema: signUpSchema,
    onSubmit: async (data: SignUpInput) => {
      setLoading(true);
      clearError();

      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);

      const result = await signUp(formData);

      if (result?.error) {
        setError(result.error);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    return () => {
      clearError();
      setRegistrationStep(1);
    };
  }, [clearError, setRegistrationStep]);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setRegistrationStep(2);
  };

  const handleBack = () => {
    if (registrationStep === 2) {
      setRegistrationStep(1);
      setSelectedRole(null);
    }
  };

  // Step 1: Role Selection
  if (registrationStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="px-4 py-4 flex items-center">
          <Link href="/auth/signin" className="text-gray-600">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-gray-900 pr-6">
            Create Account
          </h1>
        </div>

        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Step 1 of 2</span>
            <span className="text-xs text-blue-500 font-medium">50% Complete</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-blue-500 rounded-full transition-all duration-300" />
          </div>
        </div>

        <div className="flex-1 px-6">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Choose Your Role
            </h2>
            <p className="text-gray-500 mb-8">
              Select how you&apos;ll be using the app
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect("patient")}
                className="w-full p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 text-left transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Smile className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Patient / Parent
                    </h3>
                    <p className="text-sm text-gray-500">
                      Register a child for dyslexia screening and track their
                      progress
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("psychologist")}
                className="w-full p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 text-left transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Psychologist / Doctor
                    </h3>
                    <p className="text-sm text-gray-500">
                      Join our network to help screen and diagnose patients
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            </div>

            <p className="text-center mt-8 text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-500 font-medium hover:text-blue-600"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="px-6 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock className="h-4 w-4" />
            YOUR DATA IS ENCRYPTED AND STORED LOCALLY
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Account Details
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-4 py-4 flex items-center">
        <button onClick={handleBack} className="text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-gray-900 pr-6">
          Create Account
        </h1>
      </div>

      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Step 2 of 2</span>
          <span className="text-xs text-blue-500 font-medium">100% Complete</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-blue-500 rounded-full transition-all duration-300" />
        </div>
      </div>

      <div className="flex-1 px-6">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 mb-8">
            {selectedRole === "patient"
              ? "Enter your details to get started"
              : "Enter your professional details"}
          </p>

          {storeError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {storeError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              if (!selectedRole) {
                e.preventDefault();
                setFieldError("role", "Please select a role");
                return;
              }
              const form = e.currentTarget;
              let roleInput = form.querySelector<HTMLInputElement>(
                'input[name="role"]'
              );
              if (!roleInput) {
                roleInput = document.createElement("input");
                roleInput.type = "hidden";
                roleInput.name = "role";
                form.appendChild(roleInput);
              }
              roleInput.value = selectedRole;
              handleSubmit(e);
            }}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {selectedRole === "psychologist" ? "Work Email" : "Email Address"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={
                    selectedRole === "psychologist"
                      ? "dr.jane@hospital.com"
                      : "your@email.com"
                  }
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
              <p className="text-xs text-gray-400">
                Must be at least 6 characters
              </p>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-500">
                I confirm that the information provided is accurate and agree to
                the{" "}
                <Link href="/terms" className="text-blue-500 underline">
                  Terms of Service
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="text-blue-500 underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-500 font-medium hover:text-blue-600"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Lock className="h-4 w-4" />
          YOUR DATA IS ENCRYPTED AND STORED LOCALLY
        </div>
      </div>
    </div>
  );
}
