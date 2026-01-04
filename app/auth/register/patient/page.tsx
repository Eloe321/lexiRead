"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@/app/lib/hooks";
import { useAuthStore } from "@/app/lib/stores";
import {
  patientRegistrationSchema,
  type PatientRegistrationInput,
  type Gender,
} from "@/app/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  User,
  Camera,
  Loader2,
} from "lucide-react";

export default function PatientRegistrationPage() {
  const router = useRouter();
  const { error: storeError, clearError } = useAuthStore();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { errors, isSubmitting, handleSubmit, setFieldError } = useForm<
    typeof patientRegistrationSchema
  >({
    schema: patientRegistrationSchema,
    onSubmit: async (data: PatientRegistrationInput) => {
      clearError();

      // TODO: Implement actual API call to save child profile
      console.log("Saving child profile:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to next step or dashboard
      router.push("/dashboard");
    },
  });

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setFieldError("gender", null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-4 py-4 flex items-center">
        <Link href="/auth/signup" className="text-gray-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-gray-900 pr-6">
          Child Profile
        </h1>
      </div>

      <div className="px-6 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-1.5 w-16 bg-blue-500 rounded-full" />
          <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
          <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
        </div>
        <p className="text-center text-xs text-gray-500">STEP 1 OF 3</p>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Let&apos;s get to know them
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter the details of the child taking the screening. This
            helps us tailor the results.
          </p>

          {storeError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {storeError}
            </div>
          )}

          <div className="flex flex-col items-center mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-orange-200"
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Child photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-orange-300" />
              )}
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Camera className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-blue-500 text-sm font-medium"
            >
              Upload Photo
            </button>
          </div>

          <form
            onSubmit={(e) => {
              if (!selectedGender) {
                e.preventDefault();
                setFieldError("gender", "Please select a gender");
                return;
              }
              const form = e.currentTarget;
              let genderInput = form.querySelector<HTMLInputElement>(
                'input[name="gender"]'
              );
              if (!genderInput) {
                genderInput = document.createElement("input");
                genderInput.type = "hidden";
                genderInput.name = "gender";
                form.appendChild(genderInput);
              }
              genderInput.value = selectedGender;
              handleSubmit(e);
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="childFirstName">Child&apos;s First Name</Label>
              <Input
                id="childFirstName"
                type="text"
                name="childFirstName"
                placeholder="e.g. Alex"
              />
              {errors.childFirstName && (
                <p className="text-sm text-red-500">{errors.childFirstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" name="dateOfBirth" />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <Label className="mb-3 block">Gender</Label>
              <div className="flex gap-3">
                {(["Boy", "Girl", "Other"] as Gender[]).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => handleGenderSelect(gender)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      selectedGender === gender
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
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
