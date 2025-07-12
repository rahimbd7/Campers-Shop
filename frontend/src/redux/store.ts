import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import categoryReducer from "./features/category/categorySlice"
import authReducer from "./features/auth/authSlice"
import productReducer from "./features/products/productSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./features/cart/cartSlice";


const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    category: categoryReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
})


const persistConfig = {
    key:"root",
    storage,
    whitelist:["auth", "category", "product", "cart"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware:getDefaultMiddlwares => getDefaultMiddlwares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    }).concat(baseApi.middleware),
});



export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

