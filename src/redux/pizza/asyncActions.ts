import axios from 'axios'
import { TFetchPizzasArgs, TPizza } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk<TPizza[], TFetchPizzasArgs>(
  'pizza/fetchPizzas',
  async (params) => {
    const { category, sortBy, order, search, openedPage } = params
    const { data } = await axios.get<TPizza[]>(
      `https://6494bfc10da866a9536828d5.mockapi.io/pizzas?page=${openedPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)
