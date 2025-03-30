import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setQuery, selectSearch } from '@/store/features/search/searchSlice';
import {
  selectProducts,
  IProduct,
} from '@/store/features/products/productsSlice';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './searchModal.module.scss';

interface Props {
  onClose: () => void;
}

const SearchModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(selectSearch);
  const { items } = useAppSelector(selectProducts);
  const [results, setResults] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = items.filter((product: IProduct) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(searchResults);
  }, [query, items]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
          autoFocus
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        {results.length > 0 && (
          <div className={styles.results}>
            {results.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
