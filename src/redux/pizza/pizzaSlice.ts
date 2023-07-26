import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus, IPizzasScliceState, TPizza } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: IPizzasScliceState = {
  items: [],
  status: EStatus.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    getPizzas(state, action: PayloadAction<TPizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = []
      state.status = EStatus.LOADING
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = EStatus.SUCCESS
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = []
      state.status = EStatus.ERROR
    })
  },

  // *****extraReducers without typescript:
  //
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = []
  //     state.status = 'loading'
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'sucsesss'
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.items = []
  //     state.status = 'error'
  //   },
  // },
})

export const { getPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer
