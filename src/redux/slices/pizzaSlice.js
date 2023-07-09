import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get(
      `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading | sucsess | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    getPizzas(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = []
      state.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'sucsesss'
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = []
      state.status = 'error'
    },
  },
})

export const { getPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer
