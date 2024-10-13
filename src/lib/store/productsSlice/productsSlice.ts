import { type TSortOption } from "@/lib/service/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type TProductsSortState } from "./productsSice.types";

const initialState: TProductsSortState = {
  sort: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<TSortOption>) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = productsSlice.actions;
export const productsSortReducer = productsSlice.reducer;
