import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, Bookmark, Trash2, Zap, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartInner}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emptyCartSvg}>
            {/* Cart body */}
            <path d="M30 45 L15 45 L35 115 L105 115 L120 55 L40 55" stroke="#c2c2c2" strokeWidth="5" fill="#e0e0e0" strokeLinejoin="round"/>
            {/* Cart handle */}
            <path d="M30 45 L20 25" stroke="#c2c2c2" strokeWidth="5" strokeLinecap="round"/>
            {/* Wheels */}
            <circle cx="50" cy="125" r="8" fill="#c2c2c2"/>
            <circle cx="95" cy="125" r="8" fill="#c2c2c2"/>
            {/* Sad face on cart */}
            <circle cx="62" cy="82" r="4" fill="#a0a0a0"/>
            <circle cx="88" cy="82" r="4" fill="#a0a0a0"/>
            <path d="M62 98 Q75 90 88 98" stroke="#a0a0a0" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Blue shopping tag */}
            <rect x="72" y="20" width="22" height="30" rx="3" fill="#2874f0"/>
            <rect x="76" y="14" width="14" height="10" rx="3" stroke="#2874f0" strokeWidth="3" fill="none"/>
            <circle cx="83" cy="32" r="3" fill="#fff"/>
            <circle cx="83" cy="40" r="2" fill="#fff"/>
          </svg>
          <h2 className={styles.emptyCartTitle}>Your cart is empty!</h2>
          <Link to="/" className={styles.shopNowBtn}>Shop now</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  const discount = cartItems.reduce((total, item) => total + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
  const fees = 7;

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Delivery Address */}
          <div className={styles.deliverBox}>
            <div className={styles.deliverInfo}>
              <span className={styles.deliverLabel}>Deliver to:</span>
              <span className={styles.deliverName}>{user ? user.name : 'Guest'}</span>
              {user && <span className={styles.addressTag}>HOME</span>}
            </div>
            <button className={styles.changeBtn}>Change</button>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => {
            const itemDiscount = item.originalPrice > item.price
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemLeft}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                  </Link>
                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >−</button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>

                <div className={styles.itemRight}>
                  <Link to={`/product/${item.id}`} className={styles.itemTitle}>{item.title}</Link>

                  <div className={styles.ratingRow}>
                    <span className={styles.ratingBadge}>{item.rating || 4.5} ★</span>
                    <span className={styles.ratingCount}>(1,234)</span>
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className={styles.assuredBadge}
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>

                  <div className={styles.priceRow}>
                    {itemDiscount > 0 && (
                      <span className={styles.discountPct}>↓{itemDiscount}%</span>
                    )}
                    {item.originalPrice > item.price && (
                      <span className={styles.originalPrice}>₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                    <span className={styles.currentPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                  </div>

                  <div className={styles.deliveryInfo}>
                    <Truck size={14} /> <span>EXPRESS</span> Delivery in 2 days
                  </div>

                  {/* Action Buttons */}
                  <div className={styles.itemActions}>
                    <button className={styles.actionBtn}>
                      <Bookmark size={14} /> Save for later
                    </button>
                    <button className={styles.actionBtn} onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={14} /> Remove
                    </button>
                    <button className={styles.actionBtn} onClick={() => { navigate('/checkout'); }}>
                      <Zap size={14} /> Buy this now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column - Price Details */}
        <div className={styles.rightColumn}>
          <div className={styles.priceDetails}>
            <div className={styles.priceHeader}>Price Details</div>

            <div className={styles.priceDetailRow}>
              <span>MRP ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
              <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceDetailRow}>
              <span>Fees</span>
              <span>₹{fees}</span>
            </div>
            <div className={styles.priceDetailRow}>
              <span style={{ color: '#2874f0' }}>Discounts</span>
              <span style={{ color: '#388e3c' }}>− ₹{discount.toLocaleString('en-IN')}</span>
            </div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span>₹{(getCartTotal() + fees).toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div className={styles.savingsBar}>
                You will save ₹{discount.toLocaleString('en-IN')} on this order
              </div>
            )}
          </div>

          <div className={styles.secureBox}>
            <ShieldCheck size={28} color="#878787" />
            <span>Safe and secure payments. Easy returns. 100% Authentic products.</span>
          </div>

          {/* Sticky bottom Place Order bar */}
          <div className={styles.stickyBottom}>
            <div className={styles.stickyPrice}>
              <span className={styles.stickyOld}>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              <span className={styles.stickyTotal}>₹{(getCartTotal() + fees).toLocaleString('en-IN')}</span>
            </div>
            <button className={styles.stickyPlaceBtn} onClick={handlePlaceOrder}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
