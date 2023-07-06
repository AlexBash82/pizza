import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategory: {
    name: 'Все',
    index: 0,
  },
  sort: {
    name: 'популярности возр',
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
      state.openedPage = Number(action.payload.currentPage)
    },
  },
})

export const { choiseCategory, choiseSortObj, switchOpenedPage, setParam } =
  filterSlice.actions
export default filterSlice.reducer
