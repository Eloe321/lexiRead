import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/app/lib/auth/actions";
import { PsychologistDashboardContent } from "./PsychologistDashboardContent";

export default async function PsychologistDashboardPage() {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/auth/signin");
  }

  if (!user.psychologist) {
    redirect("/dashboard");
  }

  return (
    <PsychologistDashboardContent
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }}
    />
  );
}
