import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '4px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <CheckCircle size={64} color="#388e3c" style={{ margin: '0 auto 24px' }} />
      <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#212121' }}>Order Placed Successfully!</h1>
      <p style={{ fontSize: '16px', color: '#878787', marginBottom: '32px' }}>
        Thank you for shopping with us. Your order ID is <strong>{id}</strong>.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Link to="/orders" className="btn btn-primary">Line up Orders</Link>
        <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
