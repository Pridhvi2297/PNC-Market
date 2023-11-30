import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const chatReducer = createSlice({
    name: "chat",
    initialState: {},
    reducers: {},
    extraReducers: {},
  });


export const {
    messageClear,
    updateMessage
} = chatReducer.actions
export default chatReducer.reducer