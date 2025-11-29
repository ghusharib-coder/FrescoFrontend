import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
export const fetchdata = createAsyncThunk("fetch-data", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});
const HomeSlice = createSlice({
  name: "home",
  initialState: {
    isloading: true,
    products: [],
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchdata.fulfilled, (state, action) => {
      state.isloading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchdata.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(fetchdata.rejected, () => {
      alert("error happening");
    });
  },
});
export default HomeSlice.reducer;
