import { useEffect, useState } from "react";
import { Bell, CloudSun, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [weather, setWeather] = useState({ name: "Bandung", temp: 24, humidity: 78 });

  useEffect(() => {
    const handleWeatherUpdate = () => {
      const stored = localStorage.getItem("current_location");
      if (stored) {
        try {
          setWeather(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored weather", e);
        }
      }
    };

    window.addEventListener("weather-update", handleWeatherUpdate);
    handleWeatherUpdate(); // Initial load check

    return () => {
      window.removeEventListener("weather-update", handleWeatherUpdate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="text-foreground" />
      <div className="hidden md:flex relative w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search recommendations, regions..."
          className="pl-9 bg-secondary/60 border-transparent focus-visible:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs">
          <CloudSun className="h-4 w-4 text-honey animate-bounce" style={{ animationDuration: '3s' }} />
          <span className="font-semibold text-foreground">{weather.name} · {weather.temp}°C</span>
          <span className="text-muted-foreground">Humidity {weather.humidity}%</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-destructive p-0 px-1 text-[10px] text-destructive-foreground border-none">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-1 py-1 pr-3 shadow-sm">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-forest text-cream text-xs font-bold">
              BS
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-xs font-bold text-foreground">Budi Santoso</span>
            <span className="text-[10px] text-muted-foreground font-semibold">Aceh Gayo Farm</span>
          </div>
        </div>
      </div>
    </header>
  );
}