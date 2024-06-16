import { Home } from "lucide-react";

export interface AppNavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export type AppNav = AppNavItem[];

export const appNav: AppNav = [
  {
    label: "Dashboard",
    icon: Home,
    url: "/private",
  },
];
