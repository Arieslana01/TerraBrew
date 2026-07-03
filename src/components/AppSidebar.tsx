import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  History,
  Coffee,
  Leaf,
  Settings,
  Award,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/logo.png";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  
  const isActive = (url: string) =>
    url === "/dashboard" ? path === url : path.startsWith(url);

  // Dynamic menu items based on user role
  const items = user?.role === "sea"
    ? [
        { title: "Validation Portal", url: "/dashboard/validate", icon: ShieldCheck },
      ]
    : [
        { title: "Best Coffee Process", url: "/dashboard", icon: LayoutDashboard },
        { title: "Batch Planner & Prices", url: "/dashboard/batch-planner", icon: Leaf },
        { title: "Certification (Pro)", url: "/dashboard/certification", icon: Award },
        { title: "Learning Center", url: "/dashboard/learn", icon: BookOpen },
        { title: "Processing History", url: "/dashboard/history", icon: History },
      ];

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <img
            src={logoImg}
            alt="TerraBrew Logo"
            className="h-9 w-9 object-contain"
          />
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">
              TerraBrew
            </span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Sustainable Coffee
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="mx-2 rounded-xl border border-sidebar-border bg-sidebar-accent p-3 text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Leaf className="h-4 w-4" />
                Sustainability Tip
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/70">
                {user?.role === "sea" 
                  ? "Audit carefully. Ecoscore ratings are categorized as Low (< 0.33), Medium (0.33-0.66), and High (>= 0.66)."
                  : "Honey processing can cut water use by up to 80% versus washed."}
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              tooltip="Sign Out" 
              className="text-sidebar-foreground/80 hover:text-red-500 hover:bg-red-500/10 font-semibold rounded-xl flex items-center gap-3 px-3 py-2.5 transition-all w-full"
            >
              <LogOut className="h-4 w-4 text-sidebar-foreground/60" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}