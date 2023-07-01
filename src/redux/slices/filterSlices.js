import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategoryInd: 0,
  sort: {
    name: 'популярности',
    sortProp: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    choiseCategoryInd(state, action) {
      state.activeCategoryInd = action.payload
    },
    choiseSortObj(state, action) {
      state.sort = action.payload
    },
  },
})

export const { choiseCategoryInd, choiseSortObj } = filterSlice.actions
export default filterSlice.reducer
