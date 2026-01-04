import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/app/lib/auth/actions";
import { SettingsContent } from "./SettingsContent";

export default async function PsychologistSettingsPage() {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/auth/signin");
  }

  if (!user.psychologist) {
    redirect("/dashboard");
  }

  return (
    <SettingsContent
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }}
    />
  );
}
