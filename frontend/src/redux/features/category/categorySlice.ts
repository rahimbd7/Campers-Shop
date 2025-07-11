// categorySlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICategory } from "../../../interface/ICategory";


interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
  },
});

export const {
  setCategories,
  addCategory,
} = categorySlice.actions;

export default categorySlice.reducer;