import React from 'react';
import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}></div>
      <div className={styles.titleLine}></div>
      <div className={styles.titleLineShort}></div>
      <div className={styles.ratingLine}></div>
      <div className={styles.priceLine}></div>
    </div>
  );
};

export default ProductSkeleton;
