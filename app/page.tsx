import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle } from "lucide-react";
import { getUserWithProfile } from "@/app/lib/auth/actions";

// Prevent caching of this page to avoid stale redirects
export const dynamic = "force-dynamic";

export default async function Home() {
  // Check if user is logged in and redirect to appropriate dashboard
  const user = await getUserWithProfile();

  if (user) {
    // Redirect based on role
    if (user.patient) {
      redirect("/dashboard/patient");
    } else if (user.psychologist) {
      redirect("/dashboard/psychologist");
    } else {
      // User exists but no role assigned yet
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-semibold text-gray-900">LexiREAD</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Patient Login
          </Link>
          <Link href="/auth/signin">
            <Button
              variant="outline"
              className="rounded-full border-sky-500 text-sky-500 hover:bg-sky-50"
            >
              Psychologist Login
            </Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* Hero Image */}
          <div className="relative w-full aspect-[4/3] mb-8 rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArvcjIjFsJg8KY-9BaO8pO7rdbx_q4pp2fC_CqL8E2_LwkkAytiLYlf8a7tRFFaqP3GMp68vuKEUc-uakuiAyI6FDOcSYBB6MYe5rAjIL1BFOT26yVt0TUnJ8er4Qt5jDPPgqqkMYOxc46tBP9DIJC3zuK-N3roHJ4cfzfzuzEnou-U0ZunxavpIH67et6lCGgI6jDeQ2ofuyW_oTW6LKLE2wZy_B4DyF6uuC9QO_rom-E9r481z96AgMtKTl8WxzNnv-7r8pg5kI"
              alt="Owl flying over an open book"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title with Audio Button */}
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Unlock Your Potential
            </h1>
            <button
              className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 hover:bg-sky-200 transition-colors"
              aria-label="Listen to description"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-center mb-8 leading-relaxed">
            This is a quick and safe way to check your reading strengths. There
            are no wrong answers here, just do your best.
          </p>

          {/* CTA Buttons */}
          <div className="w-full space-y-4">
            <Link href="/auth/signup" className="block">
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white rounded-full py-6 text-base font-medium">
                Start Screening
              </Button>
            </Link>
            <Link
              href="/info/parents"
              className="block text-center text-sky-500 hover:text-sky-600 font-medium"
            >
              Information for Parents
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
            <CheckCircle className="h-4 w-4 text-sky-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Clinically Verified
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center">
        <p className="text-sm text-gray-400">
          © 2024 LexiREAD Healthcare. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
