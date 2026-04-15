import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      
      <div className={styles.details}>
        <h3 className={styles.title} title={product.title}>{product.title}</h3>
        
        <div className={styles.rating}>
          <span className={styles.ratingBadge}>{product.rating} ★</span>
          <span>(1,234)</span>
        </div>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <>
              <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className={styles.discount}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
