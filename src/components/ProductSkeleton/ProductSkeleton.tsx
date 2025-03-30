import styles from './productSkeleton.module.scss';

const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.price} />
    </div>
  );
};

export default ProductSkeleton;
