import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isOpen: boolean;
}

const initialState: SearchState = {
  query: '',
  isOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    reset: (state) => {
      state.query = '';
      state.isOpen = false;
    },
  },
});

export const { setQuery, setOpen, reset } = searchSlice.actions;

export const selectSearch = (state: { search: SearchState }) => state.search;

export default searchSlice.reducer;
