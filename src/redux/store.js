import { configureStore } from '@reduxjs/toolkit'
import filters from './slices/filterSlices'
import cart from './slices/cartSlices'
import pizza from './slices/pizzaSlice'

const store = configureStore({
  reducer: {
    filters: filters,
    cart,
    pizza,
  },
})
export default store
