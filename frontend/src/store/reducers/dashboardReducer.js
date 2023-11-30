import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {},
    reducers: {},
    extraReducers: {},
  });




export const {
    messageClear
} = dashboardReducer.actions
export default dashboardReducer.reducer