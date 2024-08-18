import { Provider } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const jotaiCart = atomWithStorage<
  {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
>("cart", [])

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}