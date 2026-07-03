import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { TerryChatbot } from "@/components/TerryChatbot";
import { Coffee } from "lucide-react";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CoffeeAdapt" },
      {
        name: "description",
        content:
          "Climate-adaptive recommendations, sustainability analytics, and risk alerts for coffee post-harvest processing.",
      },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground" style={{ background: "var(--gradient-hero)" }}>
        <img
          src={logoImg}
          alt="TerraBrew Logo"
          className="h-20 w-20 object-contain animate-pulse mb-4"
        />
        <div className="text-sm font-bold tracking-tight text-primary animate-pulse">Loading TerraBrew Session...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background relative">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>
        </SidebarInset>
        <TerryChatbot />
      </div>
    </SidebarProvider>
  );
}