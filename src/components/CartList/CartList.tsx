import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCart } from '@/store/features/cart/cartSlice';

import CartItem from '@/components/CartItem/CartItem';

import styles from './cartList.module.scss';

const CartList = () => {
  const { items } = useAppSelector(selectCart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log('Soon...');
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Basket is empty</h2>
        <p>Add items to your basket to see them here</p>
      </div>
    );
  }

  return (
    <div className={styles.shop}>
      <div className={styles.items}>
        {items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>
      <div className={styles.summary}>
        <h2>Total: ${total.toFixed(2)}</h2>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Place an order
        </button>
      </div>
    </div>
  );
};

export default CartList;
