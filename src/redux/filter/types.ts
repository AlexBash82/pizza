export type TActiveCategoryState = {
  name: string
  index: number
}

export type TSortState = {
  name: string
  //sortProp: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
  sortProp: string
}

export interface IFilterSliceState {
  activeCategory: TActiveCategoryState
  sort: TSortState
  openedPage: number
  searchValue: string
}
