import type { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
  return <h2 className="sticky top-0 z-20 p-4 bg-white shadow">{children}</h2>;
}
