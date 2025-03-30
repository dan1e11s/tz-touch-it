import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { IProduct } from '@/types/interfaces';

const API_URL = import.meta.env.VITE_API_URL;

interface ProductsState {
  items: IProduct[];
  currentProduct: IProduct | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<IProduct[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to get products!!!');
    }
    const data: IProduct[] = await response.json();
    return data;
  }
);

export const fetchProductById = createAsyncThunk<IProduct, number>(
  'products/fetchProductById',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to get product!!!');
    }
    const data: IProduct = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products;
