import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 z-20 border-b bg-white">
      <nav className="container flex h-16 items-center justify-between gap-4 text-sm">
        <Link href={"/"} className="text-lg font-bold">
          ZED STORE
        </Link>
        <div className="relative cursor-pointer">
          <Link href="/cart"></Link>

          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
};
