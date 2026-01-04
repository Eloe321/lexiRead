import { z } from "zod";

// Base schemas for reusable validation
export const emailSchema = z
  .string()
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(72, "Password must be less than 72 characters");

export const nameSchema = z
  .string()
  .min(1, "This field is required")
  .max(50, "Name must be less than 50 characters");

// Sign In Schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;

// Role type
export const roleSchema = z.enum(["patient", "psychologist"]);
export type Role = z.infer<typeof roleSchema>;

// Sign Up Schema
export const signUpSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

// Gender type
export const genderSchema = z.enum(["Boy", "Girl", "Other"]);
export type Gender = z.infer<typeof genderSchema>;

// Patient Registration Schema
export const patientRegistrationSchema = z.object({
  childFirstName: z
    .string()
    .min(1, "Child's name is required")
    .max(50, "Name must be less than 50 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 0 && age <= 18;
    }, "Please enter a valid date of birth"),
  gender: genderSchema,
  photo: z.string().optional(),
});

export type PatientRegistrationInput = z.infer<
  typeof patientRegistrationSchema
>;

// Specialization type
export const specializationSchema = z.enum([
  "child-psychologist",
  "clinical-psychologist",
  "educational-psychologist",
  "neuropsychologist",
  "pediatrician",
  "speech-therapist",
  "other",
]);
export type Specialization = z.infer<typeof specializationSchema>;

// Psychologist Registration Schema
export const psychologistRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  workEmail: emailSchema,
  licenseNumber: z
    .string()
    .min(1, "License number is required")
    .max(20, "License number must be less than 20 characters"),
  specialization: specializationSchema,
  agreedToTerms: z.literal(true, "You must agree to the terms and conditions"),
});

export type PsychologistRegistrationInput = z.infer<
  typeof psychologistRegistrationSchema
>;
