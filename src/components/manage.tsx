import { jotaiCart } from "@/app/providers"
import { useAtom } from "jotai"
import { Minus, Plus } from "lucide-react"
import { toast } from "sonner";

export interface Props {
    id: string;
    className: string
  }
const Manage = (props: Props) => {
    const [cart, setCart] = useAtom(jotaiCart)
    const manageCart = (productId: string, intent: "added" | "removed") => {
        const existingProduct = cart.find((p) => p.id === productId)
    
        if (intent === "added") {
          if (existingProduct) {
            setCart(
              cart.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            )
          }
        }
    
        if (intent === "removed") {
          if (existingProduct) {
            if (existingProduct.quantity > 1) {
              setCart(
                cart.map((p) =>
                  p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
                ),
              )
            } else {
              if (existingProduct) {
                setCart(cart.filter((p) => p.id !== productId))
              }
            }
          }
        }
        toast.success(`Successfully ${intent}`);
      }
      return(
        <div className={props.className}>
        <Minus
          className="h-4 w-4 cursor-pointer"
          onClick={() => manageCart(props.id, "removed")}
        />
        <p className="font-mono font-medium text-gray-900">
          {cart.find((p) => p.id === props.id)?.quantity}
        </p>
        <Plus
          className="h-4 w-4 cursor-pointer"
          onClick={() => manageCart(props.id, "added")}
        />
      </div>
      )
}

export default Manage