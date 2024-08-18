"use client"

import { jotaiCart } from "@/app/providers"
import { Button } from "@/components/ui/button"
import { demoProducts } from "@/jsondb/products"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"
import { toast } from "sonner"
import Manage from "@/components/manage"

const Page = () => {
  const [cart, setCart] = useAtom(jotaiCart)

  const addToCart = (product: {
    id: string
    name: string
    price: number
    image: string
  }) => {
    const existingProduct = cart.find((p) => p.id === product.id)

    if (existingProduct) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    toast.success("Cart updated");
  }

  

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        All Products
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {demoProducts.map((product) => (
          <div key={product.id}>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 z-10 flex aspect-square items-end justify-end overflow-hidden rounded-lg p-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black opacity-60"
                />
                <p className="relative text-lg font-semibold text-white">
                  ₹{Intl.NumberFormat('en-In').format(product.price)}
                </p>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-6 flex flex-row items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <Button
                  className={cn("w-32", cart.find((p) => p.id === product.id)&& "cursor-auto")}
                  variant={
                    cart.find((p) => p.id === product.id)?.quantity
                      ? "outline"
                      : "default"
                  }
                  onClick={() => {
                    !cart.find((p) => p.id === product.id)?.quantity &&
                      addToCart(product)
                  }}
                >
                  {JSON.stringify(cart.find((p) => p.id === product.id)) ? (
                   <Manage id={product.id} className={"flex select-none items-center gap-6"}/>
                  ) : (
                    <div className="cursor-pointer"> Add to cart</div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
