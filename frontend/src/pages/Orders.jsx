import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await api.get('/orders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [user, authLoading, navigate]);

  if (authLoading || loadingOrders) return <div style={{ padding: '24px', textAlign: 'center' }}>Loading orders...</div>;

  return (
    <div className={styles.ordersPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <span>Home</span> {'>'} <span>My Account</span> {'>'} <span>My Orders</span>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Filters</h2>
            
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeader}>Order Status</h3>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> On the way</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> Delivered</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> Cancelled</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> Returned</div>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterHeader}>Order Time</h3>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> Last 30 days</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> 2024</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> 2023</div>
              <div className={styles.filterOption}><div className={styles.checkbox}></div> Older</div>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            <div className={styles.searchContainer}>
              <input type="text" placeholder="Search your orders here" className={styles.searchInput} />
              <button className={styles.searchBtn}>
                <Search size={16} /> Search Orders
              </button>
            </div>

            {orders.length === 0 ? (
              <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '4px' }}>
                <h4>You have no orders</h4>
                <Link to="/" style={{ color: '#2874f0', marginTop: '12px', display: 'inline-block' }}>Start Shopping</Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id}>
                  {order.items && order.items.map((item, idx) => (
                    <div key={`${order.id}-${idx}`} className={styles.orderCard}>
                      <img src={item.image} alt={item.title} className={styles.itemImage} />
                      
                      <div className={styles.itemInfo}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemMeta}>Color: Black Size: MT</div>
                      </div>

                      <div className={styles.itemPrice}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>

                      <div className={styles.orderStatus}>
                        <div className={styles.statusLine}>
                          <div className={styles.dot}></div>
                          <span>Delivered on {new Date(order.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                        </div>
                        <div className={styles.statusSub}>Your item has been delivered</div>
                        
                        <div className={styles.rateAction}>
                          <Star size={14} fill="#2874f0" /> Rate & Review Product
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}

            <div className={styles.footer}>
              <button className={styles.endBtn}>No More Results To Display</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Orders;
