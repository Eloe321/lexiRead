"use server";

import { createClient } from "@/app/lib/supabase/server";
import { prisma } from "@/app/prisma/client";
import { redirect } from "next/navigation";

export type AuthResult = {
  error?: string;
  success?: boolean;
};

export async function signIn(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Failed to sign in" };
  }

  // Get user profile to determine role
  const user = await prisma.user.findUnique({
    where: { id: data.user.id },
    include: {
      patient: true,
      psychologist: true,
    },
  });

  // Redirect based on role
  if (user?.patient) {
    redirect("/dashboard/patient");
  } else if (user?.psychologist) {
    redirect("/dashboard/psychologist");
  } else {
    redirect("/dashboard");
  }
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const role = formData.get("role") as "patient" | "psychologist";

  // Create Supabase auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: role,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user" };
  }

  // Create user in our database
  try {
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        firstName,
        lastName,
      },
    });

    // Create role-specific record
    if (role === "patient") {
      await prisma.patient.create({
        data: {
          user_id: user.id,
        },
      });
    } else if (role === "psychologist") {
      await prisma.psychologist.create({
        data: {
          user_id: user.id,
        },
      });
    }
  } catch (dbError) {
    // If database creation fails, we should handle this
    console.error("Database error:", dbError);
    return { error: "Failed to create user profile" };
  }

  // Redirect based on role for additional profile setup
  if (role === "patient") {
    redirect("/auth/register/patient");
  } else {
    redirect("/auth/register/psychologist");
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/signin");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserWithProfile() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    include: {
      patient: true,
      psychologist: true,
    },
  });

  return user;
}
