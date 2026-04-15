import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px' }}>My Orders</h2>
      
      {orders.length === 0 ? (
        <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '4px' }}>
          <h4>You have no orders</h4>
          <Link to="/" style={{ color: '#2874f0', marginTop: '12px', display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ background: '#fff', padding: '24px', marginBottom: '16px', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <span style={{ fontWeight: 600 }}>Order ID:</span> {order.id}
              </div>
              <div style={{ color: '#388e3c', fontWeight: 600 }}>
                {order.status}
              </div>
            </div>
            
            {order.items && order.items.map((item, idx) => (
               <div key={idx} style={{ display: 'flex', gap: '24px', marginBottom: idx !== order.items.length - 1 ? '16px' : '0' }}>
                 <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                 <div style={{ flex: 1 }}>
                   <p style={{ fontWeight: 500, marginBottom: '8px' }}>{item.title}</p>
                   <p style={{ color: '#878787', fontSize: '14px' }}>Quantity: {item.quantity}</p>
                 </div>
                 <div style={{ fontWeight: 600, fontSize: '16px' }}>
                   ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                 </div>
               </div>
            ))}
            
            <div style={{ textAlign: 'right', marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '16px', fontWeight: 600, fontSize: '18px' }}>
              Order Total: ₹{order.total.toLocaleString('en-IN')}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
