import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCartItems: 0,
  totalCartPrice: 0,
  listCartPizzas: [],
}
//  listCartPizzas: [
//    {"name":"Крэйзи пепперони",
//     "type":"тонкое",
//     "size":30,
//     "price":580,
//     "items":1,
//     "image": imageUrl}
//  ]

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
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
    subPizza(state, action) {
      const result = state.listCartPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        if (state.listCartPizzas[result].items > 1) {
          state.listCartPizzas[result].items--
          state.totalCartItems--
          state.totalCartPrice = state.totalCartPrice - action.payload.price
        }
      }
    },
    delPizza(state, action) {
      const result = state.listCartPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        state.listCartPizzas.splice([result], 1)
        state.totalCartItems = state.totalCartItems - action.payload.items
        state.totalCartPrice =
          state.totalCartPrice - action.payload.price * action.payload.items
      }
    },
    delAllPizzas(state) {
      state.totalCartItems = 0
      state.totalCartPrice = 0
      state.listCartPizzas = []
    },
  },
})

export const cartSelector = (state) => state.cart
export const { addPizza, subPizza, delPizza, delAllPizzas } = cartSlice.actions
export default cartSlice.reducer
