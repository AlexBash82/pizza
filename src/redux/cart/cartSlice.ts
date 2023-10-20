import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { TCartPizzaState, ICartSliceState } from './types'

// *****первый вариант кода:
//
// const localSt = getCartFromLS()
// const initialState: ICartSliceState = {
//   totalCartItems: localSt.totalCartItems,
//   totalCartPrice: localSt.totalCartPrice,
//   listCartPizzas: localSt.totalCartPrice,
// }

// *****второй вариант кода:
//
// const { totalCartItems, totalCartPrice, listCartPizzas } = getCartFromLS()
// const initialState: ICartSliceState = {
//   totalCartItems,
//   totalCartPrice,
//   listCartPizzas,
// }

// *****третий вариант кода:
//
const initialState: ICartSliceState = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<TCartPizzaState>) {
      const result = state.listCartPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        state.listCartPizzas[result].items++
      } else {
        state.listCartPizzas.push(action.payload)
      }
      state.totalCartItems++
      state.totalCartPrice = state.totalCartPrice + action.payload.price
    },

    subPizza(state, action: PayloadAction<TCartPizzaState>) {
      const result = state.listCartPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (state.listCartPizzas[result].items > 1) {
        state.listCartPizzas[result].items--
        state.totalCartItems--
        state.totalCartPrice = state.totalCartPrice - action.payload.price
      }
    },

    delPizza(state, action: PayloadAction<TCartPizzaState>) {
      const result = state.listCartPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        state.listCartPizzas.splice(result, 1)
        state.totalCartItems = state.totalCartItems - action.payload.items
        state.totalCartPrice =
          state.totalCartPrice - action.payload.price * action.payload.items
      }
    },

    delAllPizzas(state) {
      state.totalCartItems = 0
      state.totalCartPrice = 0
      state.listCartPizzas = []
      localStorage.setItem('cart', '')
    },
  },
})

export const cartSelector = (state: RootState) => state.cart
export const { addPizza, subPizza, delPizza, delAllPizzas } = cartSlice.actions
export default cartSlice.reducer
