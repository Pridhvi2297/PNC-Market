import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const orderReducer = createSlice({
    name: "order",
    initialState: {},
    reducers: {},
    extraReducers: {},
  });


export const {
    messageClear
} = orderReducer.actions
export default orderReducer.reducer