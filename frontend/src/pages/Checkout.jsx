import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: ''
  });

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/api/orders', {
        items: cartItems,
        shippingAddress: address,
        total: getCartTotal()
      });
      clearCart();
      navigate(`/order-confirmation/${resp.data.order.id}`);
    } catch (error) {
      console.error('Error placing order', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.mainColumn}>
        <div className={styles.stepBox}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>1</span>
            DELIVERY ADDRESS
          </div>
          <div className={styles.stepContent}>
            <form onSubmit={handlePlaceOrder}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="text" name="name" placeholder="Name" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="tel" name="phone" placeholder="10-digit mobile number" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="text" name="pincode" placeholder="Pincode" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="text" name="locality" placeholder="Locality" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <textarea required name="addressLine" placeholder="Address (Area and Street)" className={styles.input} rows="3" onChange={handleInputChange}></textarea>
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="text" name="city" placeholder="City/District/Town" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <input required type="text" name="state" placeholder="State" className={styles.input} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ padding: '16px 32px', marginTop: '16px' }}>
                SAVE AND DELIVER HERE
              </button>
            </form>
          </div>
        </div>
        
        <div className={styles.stepBox}>
          <div className={styles.stepHeader} style={{ background: '#fff', color: '#878787' }}>
            <span className={styles.stepNumber} style={{ background: '#f0f0f0', color: '#878787' }}>2</span>
            ORDER SUMMARY
          </div>
        </div>
        
        <div className={styles.stepBox}>
          <div className={styles.stepHeader} style={{ background: '#fff', color: '#878787' }}>
            <span className={styles.stepNumber} style={{ background: '#f0f0f0', color: '#878787' }}>3</span>
            PAYMENT OPTIONS
          </div>
        </div>
      </div>
      
      <div style={{ width: '300px' }}>
        <div style={{ background: '#fff', padding: '16px', borderRadius: '2px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)' }}>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '12px', marginBottom: '12px', fontWeight: '500', color: '#878787' }}>PRICE DETAILS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Price ({cartItems.length} items)</span>
            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Delivery Charges</span>
            <span style={{ color: '#388e3c' }}>FREE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px dashed #e0e0e0', fontWeight: '600', fontSize: '18px' }}>
            <span>Amount Payable</span>
            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
