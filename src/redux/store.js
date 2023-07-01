import { configureStore } from '@reduxjs/toolkit'
import filters from './slices/filterSlices'

const store = configureStore({
  reducer: {
    filters: filters,
  },
})
export default store
