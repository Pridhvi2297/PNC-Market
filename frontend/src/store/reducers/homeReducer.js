import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
  "product/get_categorys",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const query_products = createAsyncThunk(
  'product/query_products',
  async (query, {
      fulfillWithValue
  }) => {
      try {
          const {
              data
          } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)
          return fulfillWithValue(data)
      } catch (error) {
          console.log(error.response)
      }
  }
)

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    perPage: 4,
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    priceRange: {
      low: 0,
      high: 100
  },
  },
  reducers: {},
  extraReducers: {
    [get_category.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.latest_product = payload.latest_product;
      state.topRated_product = payload.topRated_product;
      state.discount_product = payload.discount_product;
    },
    [price_range_product.fulfilled]: (state, { payload }) => {
      state.latest_product = payload.latest_product;
      state.priceRange = payload.priceRange;
    },
    [query_products.fulfilled]: (state, {
        payload
    }) => {
        state.products = payload.products
        state.totalProduct = payload.totalProduct
        state.perPage = payload.perPage
    },
  },
});

export default homeReducer.reducer;