import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  addToCart,
  removeFromCart,
  selectCart,
} from '@/store/features/cart/cartSlice';
import { IProduct } from '@/types/interfaces';

import CartIcon from '@/assets/svg/cart.svg?react';
import DeleteIcon from '@/assets/svg/delete.svg?react';

import styles from './productCard.module.scss';

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const [isHovered, setIsHovered] = useState(false);

  const isInCart = items.some((item: IProduct) => item.id === product.id);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
      {isHovered && (
        <button
          className={`${styles.cartButton} ${isInCart ? styles.inCart : ''}`}
          onClick={handleCartAction}
        >
          {isInCart ? <DeleteIcon /> : <CartIcon />}
        </button>
      )}
    </Link>
  );
};

export default ProductCard;
