import { configureStore } from '@reduxjs/toolkit'
import filters from './slices/filterSlices'
import cart from './slices/cartSlices'

const store = configureStore({
  reducer: {
    filters: filters,
    cart,
  },
})
export default store
