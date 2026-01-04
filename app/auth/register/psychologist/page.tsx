"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@/app/lib/hooks";
import { useAuthStore } from "@/app/lib/stores";
import {
  psychologistRegistrationSchema,
  type PsychologistRegistrationInput,
  type Specialization,
} from "@/app/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  FileText,
  Loader2,
} from "lucide-react";

const SPECIALIZATION_OPTIONS: { value: Specialization; label: string }[] = [
  { value: "child-psychologist", label: "Child Psychologist" },
  { value: "clinical-psychologist", label: "Clinical Psychologist" },
  { value: "educational-psychologist", label: "Educational Psychologist" },
  { value: "neuropsychologist", label: "Neuropsychologist" },
  { value: "pediatrician", label: "Pediatrician" },
  { value: "speech-therapist", label: "Speech Therapist" },
  { value: "other", label: "Other" },
];

export default function PsychologistRegistrationPage() {
  const router = useRouter();
  const { error: storeError, clearError } = useAuthStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [specialization, setSpecialization] = useState<Specialization | "">("");

  const { errors, isSubmitting, handleSubmit, setFieldError } = useForm<
    typeof psychologistRegistrationSchema
  >({
    schema: psychologistRegistrationSchema,
    onSubmit: async (data: PsychologistRegistrationInput) => {
      clearError();

      // TODO: Implement actual API call to submit for verification
      console.log("Submitting for verification:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to verification pending page or dashboard
      router.push("/dashboard");
    },
  });

  const handleTermsChange = (checked: boolean) => {
    setAgreedToTerms(checked);
    if (checked) {
      setFieldError("agreedToTerms", null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-4 py-4 flex items-center">
        <Link href="/auth/signup" className="text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-gray-900 pr-6">
          Psychologist Registration
        </h1>
      </div>

      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Step 1 of 2</span>
          <span className="text-xs text-blue-500 font-medium">
            50% Complete
          </span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-blue-500 rounded-full" />
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create Professional Account
          </h2>
          <p className="text-gray-500 mb-8">
            Join our network to help screen dyslexia. Please verify your
            credentials below.
          </p>

          {storeError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {storeError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              const form = e.currentTarget;

              // Inject specialization (Select doesn't have a native input)
              let specInput = form.querySelector<HTMLInputElement>(
                'input[name="specialization"]'
              );
              if (!specInput) {
                specInput = document.createElement("input");
                specInput.type = "hidden";
                specInput.name = "specialization";
                form.appendChild(specInput);
              }
              specInput.value = specialization;

              handleSubmit(e);
            }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <h3 className="font-semibold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
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
                <Label htmlFor="workEmail">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="workEmail"
                    type="email"
                    name="workEmail"
                    placeholder="dr.jane@hospital.com"
                    className="pl-10"
                  />
                </div>
                {errors.workEmail && (
                  <p className="text-sm text-red-500">{errors.workEmail}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <h3 className="font-semibold text-gray-900">
                  Professional Credentials
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">
                    Medical License / NPI Number
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="licenseNumber"
                      type="text"
                      name="licenseNumber"
                      placeholder="1234567890"
                      className="pl-10"
                    />
                  </div>
                  {errors.licenseNumber && (
                    <p className="text-sm text-red-500">
                      {errors.licenseNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Select
                    value={specialization}
                    onValueChange={(value) =>
                      setSpecialization(value as Specialization)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALIZATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.specialization && (
                    <p className="text-sm text-red-500">
                      {errors.specialization}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="agreedToTerms"
                checked={agreedToTerms}
                onChange={(e) => handleTermsChange(e.target.checked)}
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
            {errors.agreedToTerms && (
              <p className="text-sm text-red-500">{errors.agreedToTerms}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !agreedToTerms}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit for Verification
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
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
