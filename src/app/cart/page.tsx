"use client";

import { jotaiCart } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Manage from "@/components/manage";

export default function Cart() {
  const [cart, setCart] = useAtom(jotaiCart);
  const [coupon, setCoupon] = useState("");

  const manageCart = (
    productId: string,
    intent: "cleared" | "order placed",
  ) => {
    const existingProduct = cart.find((p) => p.id === productId);
    if (intent === "cleared") {
      if (existingProduct) {
        setCart(cart.filter((p) => p.id !== productId));
      }
    }

    if (intent === "order placed") {
      setCart([]);
    }

    toast.success(`Successfully ${intent}`);
  };

  const total = () => {
    const cartTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return cartTotal
  };

  return (
    <main className="container min-h-dvh py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {cart.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <p className="text-lg font-medium text-gray-900">
                  Your cart is empty, go{" "}
                  <Link className="underline" href="/">
                    shopping
                  </Link>
                  !
                </p>
              </div>
            )}

            {cart.map((product) => (
              <div key={product.id} className="flex py-6 sm:py-10">
                <img
                  className="h-32 w-32 rounded-md border object-cover object-center sm:h-48 sm:w-48"
                  alt={product.name}
                  src={product.image}
                />

                <div className="ml-4 flex w-full flex-col items-end justify-between">
                  <div className="flex w-full justify-between">
                    <div>
                      <h3 className="text-md font-medium">{product.name}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        ₹{Intl.NumberFormat("en-In").format(product.price)}
                      </p>
                    </div>

                    <button
                      className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-600"
                      onClick={() => manageCart(product.id, "cleared")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <Manage
                    id={product.id}
                    className={
                      "flex select-none items-center gap-4 rounded-sm border bg-white px-3 py-1"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-lg bg-gray-50 lg:col-span-5 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                ₹
                {Intl.NumberFormat("en-In").format(
                  cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  ),
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">Free</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                ₹{Intl.NumberFormat("en-In").format(total())}
              </dd>
            </div>
          </dl>

          {cart.length > 0 && (
            <div className="mt-6">
              <Link href={"/congrats"}>
                <Button
                  className="w-full"
                  onClick={() => {
                    manageCart("", "order placed");
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          )}
        </section>
      </form>
    </main>
  );
}
