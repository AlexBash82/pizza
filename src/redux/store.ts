import { configureStore } from '@reduxjs/toolkit'
import filters from './filter/filterSlice'
import cart from './cart/cartSlice'
import pizza from './pizza/pizzaSlice'

export const store = configureStore({
  reducer: {
    filters: filters,
    cart,
    pizza,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
