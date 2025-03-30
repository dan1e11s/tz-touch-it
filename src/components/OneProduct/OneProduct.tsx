import Container from '@/components/Container/Container';
import ProductSkeleton from '@/components/ProductSkeleton/ProductSkeleton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { addToCart } from '@/store/features/cart/cartSlice';
import {
  clearCurrentProduct,
  fetchProductById,
  selectProducts,
} from '@/store/features/products/productsSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CartIcon from '@/assets/svg/cart.svg?react';

import styles from './oneProduct.module.scss';

const OneProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProduct, status, error } = useAppSelector(selectProducts);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct));
    }
  };

  if (status === 'loading') {
    return (
      <Container>
        <div className={styles.skeleton}>
          <ProductSkeleton />
        </div>
      </Container>
    );
  }

  if (status === 'failed' || !currentProduct) {
    return (
      <Container>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <img src={currentProduct.image} alt={currentProduct.title} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{currentProduct.title}</h1>
          <p className={styles.price}>${currentProduct.price.toFixed(2)}</p>
          <div className={styles.rating}>
            <span>Rate: {currentProduct.rating.rate}</span>
            <span>Reviews: {currentProduct.rating.count}</span>
          </div>
          <p className={styles.description}>{currentProduct.description}</p>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            <CartIcon /> Add to cart
          </button>
        </div>
      </div>
    </Container>
  );
};

export default OneProduct;
