export type TPizza = {
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  id: string
}

export enum EStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface IPizzasScliceState {
  items: TPizza[]
  status: EStatus
}

export type TFetchPizzasArgs = {
  category: string
  sortBy: string
  order: string
  search: string
  openedPage: number
}
