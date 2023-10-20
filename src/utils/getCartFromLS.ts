import { ICartSliceState } from '../redux/cart/types'

export const getCartFromLS = () => {
  const cartItems: ICartSliceState = {
    totalCartItems: 0,
    totalCartPrice: 0,
    listCartPizzas: [],
  }

  const localSt = localStorage.getItem('cart')

  if (localSt) {
    cartItems.listCartPizzas = JSON.parse(localSt)
    cartItems.listCartPizzas.forEach((item) => {
      cartItems.totalCartItems += item.items
      cartItems.totalCartPrice += item.price * item.items
    })
  }

  return cartItems
}
