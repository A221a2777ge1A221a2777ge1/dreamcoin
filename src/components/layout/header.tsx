import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNav />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button>Connect Wallet</Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
