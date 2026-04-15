import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" style={{ width: '250px', marginBottom: '24px' }} />
        <h2>Your cart is empty!</h2>
        <p style={{ marginBottom: '24px' }}>Add items to it now.</p>
        <Link to="/" className="btn btn-primary" style={{ width: '200px' }}>Shop Now</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  const discount = cartItems.reduce((total, item) => total + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.cartHeader}>
          My Cart ({cartItems.length})
        </div>
        
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div>
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.qtyControl}>
                <button 
                  className={styles.qtyBtn} 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input type="text" value={item.quantity} readOnly className={styles.qtyInput} />
                <button 
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={styles.itemDetails}>
              <Link to={`/product/${item.id}`} className={styles.itemTitle}>{item.title}</Link>
              <div style={{ marginTop: '12px' }}>
                {item.originalPrice > item.price && <span style={{ color: '#878787', textDecoration: 'line-through', marginRight: '8px' }}>₹{item.originalPrice.toLocaleString('en-IN')}</span>}
                <span className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</span>
              </div>
              
              <div className={styles.itemActions}>
                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>REMOVE</button>
              </div>
            </div>
          </div>
        ))}
        
        <div className={styles.checkoutBox}>
          <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <div className={styles.priceDetails}>
          <div className={styles.priceHeader}>PRICE DETAILS</div>
          <div className={styles.priceRow}>
            <span>Price ({cartItems.length} items)</span>
            <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Discount</span>
            <span style={{ color: 'var(--success-green)' }}>- ₹{discount.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Delivery Charges</span>
            <span style={{ color: 'var(--success-green)' }}>Free</span>
          </div>
          <div className={styles.priceTotalRow}>
            <span>Total Amount</span>
            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
          </div>
          {discount > 0 && (
            <div style={{ padding: '12px 24px', color: 'var(--success-green)', fontWeight: '500', borderTop: '1px solid var(--border-color)' }}>
              You will save ₹{discount.toLocaleString('en-IN')} on this order
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
