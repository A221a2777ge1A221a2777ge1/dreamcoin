import Link from "next/link";
import {
  Coins,
  LayoutDashboard,
  History,
  Repeat,
  ShieldCheck,
  Sun,
  Palette,
} from "lucide-react";
import { NavLink } from "./nav-link";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
          <Palette className="h-6 w-6 text-primary" />
          <span>DreamCoin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <NavLink href="/">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink href="/swap">
          <Repeat className="h-4 w-4" />
          Swap
        </NavLink>
        <NavLink href="/rewards">
          <Coins className="h-4 w-4" />
          Rewards
        </NavLink>
        <NavLink href="/history">
          <History className="h-4 w-4" />
          History
        </NavLink>
        <NavLink href="/admin">
          <ShieldCheck className="h-4 w-4" />
          Admin
        </NavLink>
      </nav>
    </aside>
  );
}
