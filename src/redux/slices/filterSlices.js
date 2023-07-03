import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategory: {
    index: 0,
    name: 'Все',
  },
  sort: {
    name: 'популярности',
    sortProp: 'rating',
  },
  openedPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    choiseCategory(state, action) {
      state.activeCategory = action.payload
    },
    choiseSortObj(state, action) {
      state.sort = action.payload
    },
    switchOpenedPage(state, action) {
      state.openedPage = action.payload
    },
    setParam(state, action) {
      state.activeCategory = action.payload.activeCategory
      state.sort = action.payload.sort
      state.openedPage = Number(action.payload.openedPage)
    },
  },
})

export const { choiseCategory, choiseSortObj, switchOpenedPage, setParam } =
  filterSlice.actions
export default filterSlice.reducer
