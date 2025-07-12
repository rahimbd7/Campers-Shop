import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interface/IProduct";

interface ProductState {
  products: IProduct[];
  categoryWiseProducts: IProduct[];
  productById: IProduct | null;
}

const initialState: ProductState = {
  products: [],
  categoryWiseProducts: [],
  productById: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setCategoryWiseProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.categoryWiseProducts = action.payload;
    },
    setProductById: (state, action: PayloadAction<IProduct>) => {
      state.productById = action.payload;
    },
  },
});

export const { setProducts, setCategoryWiseProducts , setProductById} = productSlice.actions;
export default productSlice.reducer;
