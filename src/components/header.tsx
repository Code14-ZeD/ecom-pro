"use client";

import { jotaiCart } from "@/app/providers";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const [cart, setCart] = useAtom(jotaiCart);

  const cartQuantity = (cart: any) => {
    if (!cart.length) return 0;

    return cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  };

  return (
    <div className="sticky top-0 z-20 border-b bg-white">
      <nav className="container flex h-16 items-center justify-between gap-4 text-sm">
        <Link href={"/"} className="text-lg font-bold">
          ZED STORE
        </Link>
        <div className="relative cursor-pointer">
          <Link
            href="/cart"
            className={cn(
              "hidden",
              cartQuantity(cart) &&
                "absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0.5 font-mono text-xs text-white",
            )}
          >
            {cartQuantity(cart)}
          </Link>

          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
};
