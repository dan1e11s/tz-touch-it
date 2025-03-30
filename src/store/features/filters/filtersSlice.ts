import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  categories: string[];
  selectedCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy:
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'rating-desc'
    | null;
}

const loadFiltersFromStorage = (): FiltersState => {
  const savedFilters = localStorage.getItem('filters');
  return savedFilters
    ? JSON.parse(savedFilters)
    : {
        categories: [],
        selectedCategories: [],
        priceRange: {
          min: 0,
          max: 1000,
        },
        sortBy: null,
      };
};

const initialState: FiltersState = loadFiltersFromStorage();

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index === -1) {
        state.selectedCategories.push(action.payload);
      } else {
        state.selectedCategories.splice(index, 1);
      }
      localStorage.setItem('filters', JSON.stringify(state));
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.priceRange = action.payload;
      localStorage.setItem('filters', JSON.stringify(state));
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
      localStorage.setItem('filters', JSON.stringify(state));
    },
    resetFilters: (state) => {
      state.selectedCategories = [];
      state.priceRange = {
        min: 0,
        max: 1000,
      };
      state.sortBy = null;
      localStorage.setItem('filters', JSON.stringify(state));
    },
  },
});

export const {
  setCategories,
  toggleCategory,
  setPriceRange,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state: { filters: FiltersState }) =>
  state.filters;

export default filtersSlice.reducer;
