import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Droplets, Sun, Leaf, Award, CloudRain, Coffee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/learn")({
  head: () => ({
    meta: [
      { title: "Learning Center — TerraBrew" },
      { name: "description", content: "Educational guides on coffee processing methods, sustainability, and climate adaptation." },
    ],
  }),
  component: LearnPage,
});

const lessons = [
  { icon: Droplets, tag: "Method", title: "Washed Process Dynamics", desc: "Deep dive into clean cups, bright acidity, and managing wastewater runoff.", color: "var(--chart-4)" },
  { icon: Coffee,   tag: "Method", title: "Semi-Washed Processing", desc: "How wet hulling/Giling Basah works to create low-acidity, heavy-bodied profiles.", color: "var(--forest)" },
  { icon: Sun,      tag: "Method", title: "Honey Processing Guide", desc: "Retaining partial mucilage on raised drying beds to maximize sweetness.", color: "var(--honey)" },
  { icon: Award,    tag: "Method", title: "Mastering Wine Process", desc: "Unlocking boozy, complex notes through extended anaerobic whole-cherry fermentations.", color: "var(--chart-5)" },
  { icon: Coffee,   tag: "Method", title: "Classic Natural Processing", desc: "Drying intact cherries with minimal water input in dry, hot conditions.", color: "var(--coffee)" },
  { icon: CloudRain,tag: "Climate", title: "Managing High Humidity Risks", desc: "How relative humidity above 70% affects drying rates and how to handle ventilation.", color: "var(--chart-4)" },
];

function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          <BookOpen className="h-3 w-3 text-forest" /> Learning Center
        </div>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl text-primary font-bold">Grow your post-harvest mastery</h1>
        <p className="text-sm text-muted-foreground">Short, practical guides written for Indonesian smallholders.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((l) => (
          <Card key={l.title} className="rounded-2xl border-border bg-card shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
            <CardHeader>
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-cream"
                style={{ background: l.color }}
              >
                <l.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="w-fit rounded-full bg-secondary text-coffee-deep border-transparent">{l.tag}</Badge>
              <CardTitle className="mt-2 text-lg text-foreground font-bold">{l.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{l.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="px-0 text-coffee hover:text-coffee-deep font-semibold">Read guide →</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}