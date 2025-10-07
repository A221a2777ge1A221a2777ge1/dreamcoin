import Link from "next/link";
import {
  Coins,
  Gem,
  History,
  LayoutDashboard,
  Menu,
  Repeat,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "./nav-link";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 sm:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold mb-4"
          >
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-headline">Dreamtoke</span>
          </Link>
          <NavLink href="/">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink href="/swap">
            <Repeat className="h-5 w-5" />
            Swap
          </NavLink>
          <NavLink href="/rewards">
            <Coins className="h-5 w-5" />
            Rewards
          </NavLink>
          <NavLink href="/history">
            <History className="h-5 w-5" />
            History
          </NavLink>
          <NavLink href="/admin">
            <ShieldCheck className="h-5 w-5" />
            Admin
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
