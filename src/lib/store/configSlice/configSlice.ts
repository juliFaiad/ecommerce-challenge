import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type TConfigState } from "./configSlice.types";

// locale is for formatting currency/date, language is for translations; usually locale === language
const initialState: TConfigState = {
  currency: "EUR",
  language: "en-US",
  locale: "it-IT",
  relatedProductsCount: 5,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setRelatedProductsCount: (state, action: PayloadAction<number>) => {
      state.relatedProductsCount = action.payload;
    },
  },
});

export const { setCurrency, setLanguage, setRelatedProductsCount } =
  configSlice.actions;
export default configSlice.reducer;
