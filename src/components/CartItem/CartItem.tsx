import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  removeFromCart,
  updateQuantity,
} from '@/store/features/cart/cartSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import styles from './cartItem.module.scss';
import { IProduct } from '@/types/interfaces';

interface Props {
  product: IProduct & { quantity: number };
}

const CartItem = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(
      updateQuantity({ id: product.id, quantity: product.quantity + 1 })
    );
  };

  const handleDecreaseQuantity = () => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({ id: product.id, quantity: product.quantity - 1 })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className={styles.item}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.controls}>
          <div className={styles.quantityControl}>
            <button
              onClick={handleDecreaseQuantity}
              className={styles.quantityButton}
              disabled={product.quantity === 1}
            >
              <FaMinus />
            </button>
            <span className={styles.quantity}>{product.quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className={styles.quantityButton}
            >
              <FaPlus />
            </button>
          </div>
          <button onClick={handleRemove} className={styles.remove}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
