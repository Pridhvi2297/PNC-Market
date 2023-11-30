import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const cardReducer = createSlice({
    name: "card",
    initialState: {},
    reducers: {},
    extraReducers: {},
  });


export const {
    messageClear,
    reset_count
} = cardReducer.actions
export default cardReducer.reducer