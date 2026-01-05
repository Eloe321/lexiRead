import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/app/lib/auth/actions";

// Prevent caching of this page to avoid stale redirects
export const dynamic = "force-dynamic";

export default async function SessionPage() {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/auth/signin");
  }

  // Redirect based on role (should also add a session manager)
  if (user.patient) {
    redirect("/session/patient");
  } else if (user.psychologist) {
    redirect("/session/psychologist");
  }

  // If no role is set, show a message or redirect to role selection
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to LexiREAD
        </h1>
        <p className="text-gray-500">
          Please complete your registration to continue.
        </p>
      </div>
    </div>
  );
}
