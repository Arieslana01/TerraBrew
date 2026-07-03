import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getPendingCertifications } from "@/lib/auth-server";
import { toast } from "sonner";
import { 
  ShieldCheck, Award, ClipboardCheck, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/validate")({
  head: () => ({
    meta: [
      { title: "Validation Portal — TerraBrew" },
      { name: "description", content: "SEA Validator interface for Specialty Coffee Certifications." },
    ],
  }),
  component: ValidatePortal,
});

function ValidatePortal() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"jurisdiction" | "all">("jurisdiction");

  // Fetch pending certifications
  const { data: pendingList, isLoading } = useQuery({
    queryKey: ["pendingCertifications", user?.id, viewMode],
    queryFn: () => getPendingCertifications({ data: { validatorId: user!.id, allRegions: viewMode === "all" } }),
    enabled: !!user && user.role === "sea",
  });

  if (!user || user.role !== "sea") {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h3 className="text-lg font-bold text-foreground">Access Denied</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          This portal is strictly accessible by verified **SEA Validator** accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-honey font-bold">
            <ShieldCheck className="h-4 w-4" /> SEA Auditing Portal
          </div>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl text-primary">Validation Portal</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review farmers' self-reported sustainability metrics, check indicator scores across the 3 pillars, provide feedback, and issue official certificates.
          </p>
        </div>
        {user?.country && user?.region && (
          <Badge variant="outline" className="border-honey/30 text-honey bg-honey/5 rounded-xl px-4 py-2 text-xs font-bold gap-1.5 shadow-sm">
            📍 {user.region}, {user.country} Jurisdiction
          </Badge>
        )}
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 p-1 bg-secondary/25 rounded-2xl max-w-md border border-border/40 shadow-sm">
        <button
          onClick={() => setViewMode("jurisdiction")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all focus:outline-none ${
            viewMode === "jurisdiction"
              ? "bg-forest text-cream shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          My Jurisdiction ({user?.region || "Local"})
        </button>
        <button
          onClick={() => setViewMode("all")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all focus:outline-none ${
            viewMode === "all"
              ? "bg-forest text-cream shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Jurisdictions (Global)
        </button>
      </div>

      <Card className="rounded-2xl border-border shadow-(--shadow-soft) overflow-hidden">
        <CardHeader>
          <CardTitle className="text-primary font-bold">Certification Applications Pending Validation</CardTitle>
          <CardDescription>
            There are {pendingList?.length || 0} new specialty coffee certification requests requiring your review.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading certification requests...</div>
          ) : pendingList && pendingList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/15 px-6">
                    <th className="py-3 px-6">Coffee Farmer</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Farm Name</th>
                    <th className="py-3 px-6">Variety</th>
                    <th className="py-3 px-6 text-center">Ecoscore</th>
                    <th className="py-3 px-6">Submission Date</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingList.map((c: any) => (
                    <tr key={c.id} className="border-t border-border/60 hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-foreground">{c.farmer_name}</td>
                      <td className="py-4 px-6 text-muted-foreground text-xs">{c.farmer_email}</td>
                      <td className="py-4 px-6 font-semibold text-foreground">{c.farm_name}</td>
                      <td className="py-4 px-6 text-muted-foreground">{c.coffee_variety}</td>
                      <td className="py-4 px-6 text-center font-bold text-forest">{Number(c.ecoscore).toFixed(2)}</td>
                      <td className="py-4 px-6 text-muted-foreground text-xs">
                        {new Date(c.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          onClick={() => navigate({ to: `/dashboard/review` })}
                          size="sm"
                          className="bg-forest text-cream hover:bg-forest-deep rounded-lg font-bold text-xs"
                        >
                          <ClipboardCheck className="mr-1 h-3.5 w-3.5" /> Review Audit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground font-semibold">
              No certification requests are pending validation at this time.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
