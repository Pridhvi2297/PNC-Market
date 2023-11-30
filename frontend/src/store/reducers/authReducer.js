import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const authReducer = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
    extraReducers: {},
  });



export const { messageClear,user_reset } = authReducer.actions
export default authReducer.reducer