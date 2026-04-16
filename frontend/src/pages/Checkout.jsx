import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Plus, Check, ShieldCheck, Truck, CreditCard, Package } from 'lucide-react';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './Checkout.module.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', pincode: '', locality: '',
    addressLine: '', city: '', state: '', addressType: 'HOME'
  });

  useEffect(() => {
    if (!loading && !user) { navigate('/login?redirect=checkout'); return; }
    if (user) fetchAddresses();
  }, [user, loading]);

  const [checkoutStep, setCheckoutStep] = useState(1);

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/addresses');
      setAddresses(res.data.addresses);
      const def = res.data.addresses.find(a => a.is_default);
      if (def) setSelectedAddressId(def.id);
      else if (res.data.addresses.length > 0) setSelectedAddressId(res.data.addresses[0].id);
      if (res.data.addresses.length === 0) setShowForm(true);
    } catch (err) { console.error('Error fetching addresses', err); }
    finally { setLoadingAddresses(false); }
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/addresses', form);
      setAddresses([...addresses, res.data.address]);
      setSelectedAddressId(res.data.address.id);
      setShowForm(false);
      setForm({ name: '', phone: '', pincode: '', locality: '', addressLine: '', city: '', state: '', addressType: 'HOME' });
    } catch (err) { console.error('Error saving address', err); alert('Failed to save address'); }
  };

  const handleDeliverHere = () => {
    if (selectedAddressId) {
      setCheckoutStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) { alert('Please select a delivery address'); return; }
    try {
      setPlacingOrder(true);
      const res = await api.post('/orders', { items: cartItems, shippingAddress: selectedAddress, total: getCartTotal() });
      clearCart();
      navigate(`/order-confirmation/${res.data.order.id}`);
    } catch (error) { console.error('Error placing order', error); alert('Failed to place order.'); }
    finally { setPlacingOrder(false); }
  };

  if (loading || loadingAddresses) return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner}></div>
      <span>Loading checkout...</span>
    </div>
  );
  if (!user) return null;
  if (cartItems.length === 0) { navigate('/cart'); return null; }

  const discount = cartItems.reduce((t, i) => t + ((i.originalPrice || i.price) - i.price) * i.quantity, 0);
  const totalOriginal = cartItems.reduce((t, i) => t + (i.originalPrice || i.price) * i.quantity, 0);

  const activeAddress = addresses.find(a => a.id === selectedAddressId);

  return (
    <div className={styles.checkoutPage}>
      {/* Checkout Header */}
      <div className={styles.checkoutBanner}>
        <div className={styles.bannerInner}>
          <div className={styles.bannerSteps}>
            <div className={`${styles.bannerStep} ${styles.bannerStepActive}`}><span>1</span> ADDRESS</div>
            <div className={styles.bannerDivider}></div>
            <div className={`${styles.bannerStep} ${checkoutStep === 2 ? styles.bannerStepActive : ''}`}><span>2</span> ORDER SUMMARY</div>
            <div className={styles.bannerDivider}></div>
            <div className={styles.bannerStep}><span>3</span> PAYMENT</div>
          </div>
          <div className={styles.bannerSecure}>
            <ShieldCheck size={18} /> 100% Secure
          </div>
        </div>
      </div>

      <div className={styles.checkoutContainer}>
        {/* Left Column */}
        <div className={styles.leftColumn}>

          {/* Step 1: Delivery Address */}
          <div className={styles.stepBox}>
            <div className={checkoutStep === 1 ? styles.stepHeader : styles.stepHeaderInactive} style={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
              <div>
                <span className={checkoutStep === 1 ? styles.stepNumber : styles.stepNumberInactive}>1</span>
                DELIVERY ADDRESS
                {checkoutStep === 2 && activeAddress && (
                  <span style={{marginLeft:'16px', fontSize:'14px', fontWeight:'normal', color:'#212121'}}>
                    {activeAddress.name}, {activeAddress.pincode}
                  </span>
                )}
              </div>
              {checkoutStep === 2 && (
                <button onClick={() => setCheckoutStep(1)} style={{background:'none', border:'none', color:'#2874f0', fontWeight:'600', cursor:'pointer', fontSize:'14px'}}>
                  CHANGE
                </button>
              )}
            </div>
            
            {checkoutStep === 1 && (
            <div className={styles.stepContent}>
              {addresses.map(addr => (
                <div key={addr.id}
                  className={`${styles.addressCard} ${selectedAddressId === addr.id ? styles.addressCardSelected : ''}`}
                  onClick={() => setSelectedAddressId(addr.id)}
                >
                  <div className={styles.addressRadio}>
                    <div className={`${styles.radio} ${selectedAddressId === addr.id ? styles.radioActive : ''}`}>
                      {selectedAddressId === addr.id && <div className={styles.radioDot}></div>}
                    </div>
                  </div>
                  <div className={styles.addressInfo}>
                    <div className={styles.addressHead}>
                      <span className={styles.addressName}>{addr.name}</span>
                      <span className={styles.addressTag}>{addr.address_type}</span>
                      <span className={styles.addressPhone}>{addr.phone}</span>
                    </div>
                    <p className={styles.addressText}>
                      {addr.address_line}, {addr.locality && `${addr.locality}, `}{addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                    </p>
                    {selectedAddressId === addr.id && (
                      <button className={styles.deliverHereBtn} onClick={(e) => { e.stopPropagation(); handleDeliverHere(); }}>
                        DELIVER HERE
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {!showForm ? (
                <button className={styles.addNewBtn} onClick={() => setShowForm(true)}>
                  <Plus size={18} strokeWidth={2.5} /> Add a new address
                </button>
              ) : (
                <div className={styles.addressForm}>
                  <h3 className={styles.formTitle}><MapPin size={16} /> ADD A NEW ADDRESS</h3>
                  <form onSubmit={handleSaveAddress}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Name *</label>
                        <input required type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Mobile *</label>
                        <input required type="tel" name="phone" placeholder="10-digit mobile number" value={form.phone} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Pincode *</label>
                        <input required type="text" name="pincode" placeholder="6-digit pincode" value={form.pincode} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Locality</label>
                        <input type="text" name="locality" placeholder="Locality / Area" value={form.locality} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Address *</label>
                      <textarea required name="addressLine" placeholder="House No., Building, Street, Area" value={form.addressLine} onChange={handleFormChange} className={styles.formTextarea} rows="3" />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>City *</label>
                        <input required type="text" name="city" placeholder="City/District/Town" value={form.city} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>State *</label>
                        <input required type="text" name="state" placeholder="State" value={form.state} onChange={handleFormChange} className={styles.formInput} />
                      </div>
                    </div>
                    <div className={styles.typeRow}>
                      <span className={styles.typeTitle}>Address Type</span>
                      <label className={`${styles.typeLabel} ${form.addressType === 'HOME' ? styles.typeLabelActive : ''}`}>
                        <input type="radio" name="addressType" value="HOME" checked={form.addressType === 'HOME'} onChange={handleFormChange} /> Home
                      </label>
                      <label className={`${styles.typeLabel} ${form.addressType === 'WORK' ? styles.typeLabelActive : ''}`}>
                        <input type="radio" name="addressType" value="WORK" checked={form.addressType === 'WORK'} onChange={handleFormChange} /> Work
                      </label>
                    </div>
                    <div className={styles.formActions}>
                      <button type="submit" className={styles.saveBtn}>SAVE AND DELIVER HERE</button>
                      <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>CANCEL</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Step 2: Order Summary */}
          <div className={styles.stepBox}>
            <div className={checkoutStep === 2 ? styles.stepHeader : styles.stepHeaderInactive}>
              <span className={checkoutStep === 2 ? styles.stepNumber : styles.stepNumberInactive}>2</span>
              ORDER SUMMARY
              <span className={styles.stepItemCount}>{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
            </div>
            {checkoutStep === 2 && (
              <div className={styles.orderPreview} style={{flexDirection: 'column', padding: '16px 24px'}}>
                <div style={{display:'flex', gap:'16px'}}>
                  {cartItems.slice(0, 3).map(item => (
                    <div key={item.id} className={styles.previewItem}>
                      <img src={item.image} alt={item.title} className={styles.previewImg} />
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <div className={styles.previewMore}>+{cartItems.length - 3}</div>
                  )}
                </div>
                <div style={{marginTop: '24px'}}>
                  <button className={styles.deliverHereBtn} onClick={() => setCheckoutStep(3)}>CONTINUE</button>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={styles.stepBox}>
            <div className={checkoutStep === 3 ? styles.stepHeader : styles.stepHeaderInactive}>
              <span className={checkoutStep === 3 ? styles.stepNumber : styles.stepNumberInactive}>3</span>
              PAYMENT OPTIONS
            </div>
            {checkoutStep === 3 && (
              <div style={{padding: '16px 24px'}}>
                <div style={{padding: '16px', background: '#f5faff', border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '16px', display:'flex', alignItems:'center', gap:'16px'}}>
                   <div style={{width:'20px', height:'20px', borderRadius:'50%', border:'6px solid #2874f0', display:'inline-block'}}></div>
                   <span style={{fontWeight:'500'}}>Cash on Delivery (COD)</span>
                </div>
                <button
                  className={styles.placeOrderBtn}
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddressId || placingOrder}
                  style={{width: '250px'}}
                >
                  {placingOrder ? 'Placing Order...' : 'CONFIRM ORDER'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.priceCard}>
            <div className={styles.priceHeader}>PRICE DETAILS</div>
            <div className={styles.priceRow}>
              <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
              <span>₹{totalOriginal.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Delivery Charges</span>
              <span className={styles.freeText}>FREE</span>
            </div>
            {discount > 0 && (
              <div className={styles.priceRow}>
                <span>Discount</span>
                <span className={styles.discountText}>− ₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className={styles.savingsText}>
                You will save ₹{discount.toLocaleString('en-IN')} on this order
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}><ShieldCheck size={20} /> <span>Safe & Secure</span></div>
            <div className={styles.trustItem}><Truck size={20} /> <span>Free Delivery</span></div>
            <div className={styles.trustItem}><Package size={20} /> <span>Easy Returns</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
