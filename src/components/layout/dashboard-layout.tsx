import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { MobileNav } from "./mobile-nav";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1 bg-background overflow-auto pb-20 sm:pb-0">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
