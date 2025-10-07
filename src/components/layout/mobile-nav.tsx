import Link from "next/link";
import {
  Coins,
  History,
  LayoutDashboard,
  Repeat,
} from "lucide-react";
import { NavLink } from "./nav-link";

export function MobileNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around z-40">
        <NavLink href="/">
            <LayoutDashboard className="h-6 w-6" />
            <span className="sr-only">Dashboard</span>
        </NavLink>
        <NavLink href="/swap">
            <Repeat className="h-6 w-6" />
            <span className="sr-only">Swap</span>
        </NavLink>
        <NavLink href="/rewards">
            <Coins className="h-6 w-6" />
            <span className="sr-only">Rewards</span>
        </NavLink>
        <NavLink href="/history">
            <History className="h-6 w-6" />
            <span className="sr-only">History</span>
        </NavLink>
    </nav>
  );
}
