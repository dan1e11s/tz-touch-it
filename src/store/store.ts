import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './features/products/productsSlice';
import searchReducer from './features/search/searchSlice';
import cartReducer from './features/cart/cartSlice';
import filtersReducer from './features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
});

// ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
