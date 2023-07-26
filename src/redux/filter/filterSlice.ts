import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFilterSliceState, TActiveCategoryState, TSortState } from './types'

const initialState: IFilterSliceState = {
  activeCategory: {
    name: 'Все',
    index: 0,
  },

  sort: {
    name: 'популярности возр',
    sortProp: 'rating',
  },

  openedPage: 1,
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    choiseCategory(state, action: PayloadAction<TActiveCategoryState>) {
      state.activeCategory = action.payload
    },

    choiseSortObj(state, action: PayloadAction<TSortState>) {
      state.sort = action.payload
    },

    switchOpenedPage(state, action: PayloadAction<number>) {
      state.openedPage = action.payload
    },

    setParam(state, action: PayloadAction<IFilterSliceState>) {
      state.activeCategory = action.payload.activeCategory
      state.sort = action.payload.sort
      state.openedPage = Number(action.payload.openedPage)
      state.searchValue = action.payload.searchValue
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const {
  choiseCategory,
  choiseSortObj,
  switchOpenedPage,
  setParam,
  setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer
