export type TCartPizzaState = {
  name: string
  type: string
  size: number
  price: number
  items: number
  image: string
}

export interface ICartSliceState {
  totalCartItems: number
  totalCartPrice: number
  listCartPizzas: TCartPizzaState[]
}
