import { createFileRoute } from "@tanstack/react-router";
import { History, Droplets, Thermometer, CloudRain, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({
    meta: [
      { title: "Processing History — TerraBrew" },
      { name: "description", content: "Past recommendations, environmental conditions, and chosen processing methods." },
    ],
  }),
  component: HistoryPage,
});

const rows = [
  { date: "May 09, 2026", method: "Honey", rain: 12, temp: 23, humidity: 70, eco: 85, color: "var(--honey)" },
  { date: "May 06, 2026", method: "Washed", rain: 48, temp: 22, humidity: 84, eco: 55, color: "var(--chart-4)" },
  { date: "May 03, 2026", method: "Natural", rain: 4, temp: 26, humidity: 62, eco: 95, color: "var(--coffee)" },
  { date: "Apr 29, 2026", method: "Semi Washed", rain: 22, temp: 24, humidity: 75, eco: 75, color: "var(--forest)" },
  { date: "Apr 25, 2026", method: "Wine Process", rain: 8, temp: 25, humidity: 55, eco: 90, color: "var(--chart-5)" },
];

function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          <History className="h-3 w-3 text-forest" /> Processing History
        </div>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl text-primary">Your past harvests</h1>
        <p className="text-sm text-muted-foreground">A timeline of TerraBrew runs and the methods recommended.</p>
      </div>

      <Card className="rounded-2xl border-border shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle className="text-primary font-bold">Recent runs</CardTitle>
          <CardDescription>Compare conditions to learn what works on your farm.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                  <th className="py-3">Date</th>
                  <th className="py-3">Method</th>
                  <th className="py-3"><CloudRain className="inline h-3.5 w-3.5 mr-1" /> Rain</th>
                  <th className="py-3"><Thermometer className="inline h-3.5 w-3.5 mr-1" /> Temp</th>
                  <th className="py-3"><Droplets className="inline h-3.5 w-3.5 mr-1" /> Humidity</th>
                  <th className="py-3"><Leaf className="inline h-3.5 w-3.5 mr-1" /> Eco Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.date} className="border-t border-border/60 hover:bg-secondary/10 transition-colors">
                    <td className="py-4 font-bold text-foreground">{r.date}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                        {r.method}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{r.rain} mm</td>
                    <td className="py-4 text-muted-foreground">{r.temp}°C</td>
                    <td className="py-4 text-muted-foreground">{r.humidity}%</td>
                    <td className="py-4">
                      <Badge className="rounded-full bg-forest/15 text-forest border-transparent hover:bg-forest/15">{r.eco}/100</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="rounded-2xl border-border shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle className="text-primary font-bold">Season timeline</CardTitle>
          <CardDescription>How your processing choices evolved with the climate.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="relative ml-3 space-y-6 border-l border-border pl-6">
            {rows.map((r) => (
              <li key={r.date} className="relative">
                <span
                  className="absolute -left-[1.85rem] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-background"
                  style={{ background: r.color }}
                />
                <div className="text-xs text-muted-foreground font-semibold">{r.date}</div>
                <div className="font-bold text-foreground mt-0.5">{r.method} process</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {r.rain} mm rain · {r.temp}°C · {r.humidity}% humidity · Eco Score {r.eco}/100
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}