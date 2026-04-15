import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ShoppingCart, Zap, Shield, RotateCcw, Truck, Star, ChevronRight, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '24px', textAlign: 'center' }}>Product not found</div>;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.imageGallery}>
          <img src={product.image} alt={product.title} className={styles.mainImage} />
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.addBtn} onClick={handleAddToCart}>
             <ShoppingCart size={20} /> ADD TO CART
          </button>
          <button className={styles.buyBtn} onClick={handleBuyNow}>
             <Zap size={20} fill="currentColor" /> BUY NOW
          </button>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.rating}>{product.rating} ★</div>
        
        <div className={styles.priceSection}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <>
              <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className={styles.discount}>{discount}% off</span>
            </>
          )}
        </div>
        
        <div>
          <h4>Available offers</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '14px', lineHeight: '2' }}>
            <li>Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
            <li>Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction</li>
            <li>Special Price Get extra {discount}% off (price inclusive of cashback/coupon)</li>
          </ul>
        </div>
        
        <div className={styles.descriptionBox}>
          <h2 className={styles.descTitle}>Product Description</h2>
          <p className={styles.descContent}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
