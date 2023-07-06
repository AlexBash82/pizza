import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalItems: 0,
  totalPrice: 0,
  totalPizzas: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzas(state, action) {
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
      console.log('state.totalPizzas - ', JSON.stringify(state.totalPizzas))
    },
  },
})

export const { addPizzas } = cartSlice.actions
export default cartSlice.reducer
