import { redirect } from "next/navigation";
import ScreeningContent from "./ScreeningContent";

// Prevent caching of this page to avoid stale redirects
export const dynamic = "force-dynamic";

export default async function ScreeningPage() {

  return (
    <ScreeningContent />
  );
}
