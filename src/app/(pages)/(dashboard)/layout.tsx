import {
  BarChart,
  Building2,
  FileText,
  Home,
  LineChartIcon,
  MapPin,
  PieChart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/layouts/sidebar";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar className="border-r sticky">
        <SidebarHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <div className="font-semibold text-lg">{siteConfig.name}</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Sistema de Pronóstico Inmobiliario
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <Link href="/">Inicio</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                <Link href="/">Predicciones</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <Link href="/">Comparativas</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <Link href="/">Mapa</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <Link href="/">Estadísticas</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Link href="">Reportes</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <SidebarMenuButton className="flex items-center gap-2 w-full">
            <Settings className="h-4 w-4" />
            <Link href="">Configuración</Link>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      {children}
    </div>
  );
}
