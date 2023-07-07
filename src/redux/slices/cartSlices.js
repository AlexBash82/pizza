import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalItems: 0,
  totalPrice: 0,
  totalPizzas: [],
}
//  totalPizzas: [
//    {"name":"Крэйзи пепперони",
//     "type":"тонкое",
//     "size":30,
//     "price":580,
//     "items":1}
//  ]

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const result = state.totalPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        state.totalPizzas[result].items++
      } else {
        state.totalPizzas.push(action.payload)
      }
      state.totalItems++
      state.totalPrice = state.totalPrice + action.payload.price
    },
    subPizza(state, action) {
      const result = state.totalPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        if (state.totalPizzas[result].items > 1) {
          state.totalPizzas[result].items--
          state.totalItems--
          state.totalPrice = state.totalPrice - action.payload.price
        }
      }
    },
    delPizza(state, action) {
      const result = state.totalPizzas.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (result >= 0) {
        state.totalPizzas.splice([result], 1)
        state.totalItems = state.totalItems - action.payload.items
        state.totalPrice =
          state.totalPrice - action.payload.price * action.payload.items
      }
    },
    delAllPizzas(state) {
      state.totalItems = 0
      state.totalPrice = 0
      state.totalPizzas = []
    },
  },
})

export const { addPizza, subPizza, delPizza, delAllPizzas } = cartSlice.actions
export default cartSlice.reducer
