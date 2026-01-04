import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/app/lib/auth/actions";
import { PatientDashboardContent } from "./PatientDashboardContent";

export default async function PatientDashboardPage() {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/auth/signin");
  }

  if (!user.patient) {
    redirect("/dashboard");
  }

  return (
    <PatientDashboardContent
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }}
    />
  );
}
