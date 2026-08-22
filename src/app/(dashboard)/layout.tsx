import GlobalSearch from "@/components/dashboard/global-search/global-search";
import { GlobalSearchProvider } from "@/components/dashboard/global-search/global-search-context";
import Sidebar from "@/components/dashboard/sidebar";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
  Illustration,
} from "@/components/ui/glowing-stars";
import { Vortex } from "@/components/ui/vortex";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    redirect("/login");
  }
  return (
    <div className="flex relative min-h-screen overflow-hidden">
      <div className="bg-primary h-24 w-full top-0 left-0 blur-3xl absolute scale-[2] -z-10 opacity-20" />
      <Sidebar session={session} />
      <main className=" w-full p-16 mr-(--container-sm) relative">
        <Vortex
          rangeY={700}
          baseSpeed={0.01}
          rangeSpeed={0.05}
          backgroundColor="transparent"
          baseHue={170}
          containerClassName="absolute top-0 right-0 opacity-25 -z-10 h-full w-full"
        />
        <GlobalSearchProvider>
          <GlobalSearch />
        </GlobalSearchProvider>
        <div className="pt-12">{children}</div>
      </main>
    </div>
  );
}
