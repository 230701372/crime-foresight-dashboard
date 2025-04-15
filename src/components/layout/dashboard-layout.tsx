
import { useState } from "react";
import { Sidebar, MobileMenuTrigger } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <MobileMenuTrigger setIsOpen={setSidebarOpen} />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Crime Foresight Dashboard</h1>
          </div>
        </header>
        <main className={cn("px-4 py-6 sm:px-6 lg:px-8")}>
          {children}
        </main>
      </div>
    </div>
  );
}
