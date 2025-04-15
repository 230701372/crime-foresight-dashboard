
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChartBar,
  Map,
  BarChart3,
  Settings,
  Home,
  TrendingUp,
  AlertTriangle,
  MenuSquare,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ className, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Crime Map",
      href: "/map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Predictions",
      href: "/predictions",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Hotspots",
      href: "/hotspots",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: <ChartBar className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-50 h-full w-64 transform border-r border-sidebar-border transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-bold text-sidebar-foreground">CrimeForesight</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="px-3 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
                    )
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}

export function MobileMenuTrigger({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open Menu"
      className="lg:hidden"
      onClick={() => setIsOpen(true)}
    >
      <MenuSquare className="h-6 w-6" />
    </Button>
  );
}
