import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
