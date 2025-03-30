import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  setCategories,
  toggleCategory,
  setPriceRange,
  setSortBy,
  resetFilters,
  selectFilters,
  FiltersState,
} from '@/store/features/filters/filtersSlice';

import styles from './filtersModal.module.scss';

interface Props {
  onClose: () => void;
}

const FiltersModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategories, priceRange, sortBy } =
    useAppSelector(selectFilters);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories'
        );
        const data = await response.json();
        dispatch(setCategories(data));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setPriceRange({
        ...priceRange,
        [name]: Number(value),
      })
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as FiltersState['sortBy']));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Filters</h2>

        <div className={styles.section}>
          <h3>Categories</h3>
          <div className={styles.categories}>
            {categories.map((category: string) => (
              <label key={category} className={styles.category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Price</h3>
          <div className={styles.priceRange}>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="Мин"
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="Макс"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3>Sort</h3>
          <select value={sortBy || ''} onChange={handleSortChange}>
            <option value="">No sorting</option>
            <option value="price-asc">Price (ascending)</option>
            <option value="price-desc">Price (descending)</option>
            <option value="name-asc">Title (A to Z)</option>
            <option value="name-desc">Title (Z-A)</option>
            <option value="rating-desc">By rating</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button onClick={handleReset}>Reset</button>
          <button onClick={onClose}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
