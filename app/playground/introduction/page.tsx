import { redirect } from "next/navigation";
import { getUserWithProfile } from "@/app/lib/auth/actions";
import IntroductionContent from "./IntroductionContent";

export default async function IntroductionPage() {
  const user = await getUserWithProfile();

  if (!user) {
    redirect("/auth/signin");
  }

  if (!user.patient) {
    redirect("/dashboard");
  }

  return (
    <IntroductionContent/>
  );
}
