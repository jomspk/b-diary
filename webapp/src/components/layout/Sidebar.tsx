"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const sideBarWidth = "200px";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav
      className="flex flex-col fixed bottom-0 left-0 top-0 bg-primary text-primary-foreground border-r"
      style={{ width: sideBarWidth }}
    >
      <NavItem
        name="カード一覧"
        href="/cards"
        isActive={isActive(pathname, "/cards")}
        icon={<CreditCard />}
      />
      <NavItem
        name="ユーザー一覧"
        href="/users"
        isActive={isActive(pathname, "/users")}
        icon={<User />}
      />
    </nav>
  );
}

function NavItem({
  name,
  href,
  isActive,
  icon,
}: {
  name: string;
  href: string;
  isActive: boolean;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn("p-3 border-b border-b-white/30", {
        "bg-white text-primary": isActive,
        "hover:bg-white/10": !isActive,
      })}
    >
      <div className="flex gap-2">
        {icon}
        {name}
      </div>
    </Link>
  );
}

const isActive = (pathname: string, href: string) => {
  return pathname === href || pathname.startsWith(`${href}/`);
};
