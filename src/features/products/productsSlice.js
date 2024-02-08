import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { shuffle } from "../../utils/common"

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
  try {
    const res = await axios(`${BASE_URL}/products`)
    return res.data

  } catch (err) {
    console.log(err)
    return thunkApi.rejectWithValue(err)
  }
})


const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, action) => {
      state.filtered = state.list.filter(({ price }) => price < action.payload)
    },
    getRelatedProduct: (state, action) => {
      const list = state.list.filter(({ category: { id } }) => id === action.payload)
      state.related = shuffle(list)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    })
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { filterByPrice, getRelatedProduct } = productsSlice.actions;

export default productsSlice.reducer