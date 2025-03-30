import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import {
  fetchProducts,
  selectProducts,
} from '@/store/features/products/productsSlice';

import ProductCard from '@/components/ProductCard/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton/ProductSkeleton';

import styles from './productList.module.scss';
import { IProduct } from '@/types/interfaces';
import { selectFilters } from '@/store/features/filters/filtersSlice';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(selectProducts);
  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = (items as IProduct[])
    .filter((product) => {
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (!filters.sortBy) return 0;

      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'rating-desc':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  //! skeleton
  if (status === 'loading') {
    return (
      <section className={styles.list}>
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </section>
    );
  }

  //! failed
  if (status === 'failed') {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductList;
