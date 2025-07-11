import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interface/IProduct";

interface ProductState {
    products: IProduct[]
}
const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
   initialState,
    reducers: {
        setProducts: (state, action:PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;