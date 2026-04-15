import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, User, Heart, Package, Star, Store, Gift, Bell, HeadphonesIcon, TrendingUp, Download, UserCircle, CreditCard, LogOut, MapPin } from 'lucide-react';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const collapsedState = useRef(false);
  const isTransitioning = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isTransitioning.current) {
        lastScrollY.current = currentScrollY;
        return;
      }
      
      if (Math.abs(currentScrollY - lastScrollY.current) < 20) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50 && !collapsedState.current) {
        collapsedState.current = true;
        setIsCollapsed(true);
        isTransitioning.current = true;
        setTimeout(() => isTransitioning.current = false, 500);
      } else if (currentScrollY < lastScrollY.current && collapsedState.current) {
        collapsedState.current = false;
        setIsCollapsed(false);
        isTransitioning.current = true;
        setTimeout(() => isTransitioning.current = false, 500);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: 'For You', slug: '', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/all.svg' },
    { name: 'Fashion', slug: 'fashion', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/fashion.svg' },
    { name: 'Mobiles', slug: 'mobiles', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/mobiles.svg' },
    { name: 'Beauty', slug: 'beauty', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/beauty.svg' },
    { name: 'Electronics', slug: 'electronics', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/electronics.svg' },
    { name: 'Home', slug: 'home-kitchen', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/home-final.svg' },
    { name: 'Appliances', slug: 'appliances', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/tv.svg' },
    { name: 'Toys, ba...', slug: 'toys', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/toy.svg' },
    { name: 'Food & H...', slug: 'food-health', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/food.svg' },
    { name: 'Auto Acc...', slug: 'auto-accessories', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-acc.svg' },
    { name: '2 Wheele...', slug: '2-wheelers', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/auto-new.svg' },
    { name: 'Sports & ...', slug: 'sports', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/sport.svg' },
    { name: 'Books & ...', slug: 'books', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/books.svg' },
    { name: 'Furniture', slug: 'furniture', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/furniture.svg' },
  ];

  return (
    <div className={styles.navbarWrapper}>
      <header className={styles.header}>
        {/* Top Row */}
        <div className={styles.topRow}>
          <div className={styles.brandTabs}>
            <Link to="/" className={`${styles.brandTab} ${styles.activeTab}`} style={{ gap: '8px' }}>
              <div style={{ display: 'flex', position: 'relative', width: '26px', height: '22px' }}>
                <img 
                  src="https://rukminim2.flixcart.com/fk-p-flap/26/22/image/d2ecfddf891a3922.png" 
                  alt="Flipkart Icon" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>
              <div style={{ display: 'flex', position: 'relative', width: '46px', height: '18px' }}>
                <img 
                  alt="Flipkart Text" 
                  aria-busy="false" 
                  data-highres-loaded="false" 
                  loading="lazy" 
                  fetchpriority="auto" 
                  height="18" 
                  width="46" 
                  srcSet="https://rukminim2.flixcart.com/fk-p-flap/46/18/image/31f7e3af490c225f.png?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/92/36/image/31f7e3af490c225f.png?q=60 2x" 
                  src="https://rukminim2.flixcart.com/fk-p-flap/92/36/image/31f7e3af490c225f.png?q=90" 
                  style={{ filter: 'none', opacity: 1, transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out', width: '100%', height: '100%', margin: 'auto', objectFit: 'contain', aspectRatio: '23 / 9' }} 
                />
              </div>
            </Link>
            <Link to="/flights-travel-uhp-at-store" className={`${styles.brandTab} ${styles.travelTab}`} style={{ gap: '8px', alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexBasis: 'auto', flexDirection: 'row', flexShrink: 0, minHeight: '0px', minWidth: '0px', position: 'relative', zIndex: 0, borderWidth: '0px', justifyContent: 'center', height: '44px' }}>
              <div style={{ display: 'flex', flexBasis: 'auto', flexFlow: 'column', flexShrink: 0, alignItems: 'center', minHeight: '0px', minWidth: '0px', position: 'relative', zIndex: 0, boxSizing: 'border-box', borderWidth: '0px', justifyContent: 'center', placeSelf: 'center' }}>
                <div style={{ display: 'flex', position: 'relative', width: '29.3333px', height: '22px' }}>
                  <img 
                    alt="Travel Icon" 
                    aria-busy="false" 
                    data-highres-loaded="false" 
                    loading="lazy" 
                    fetchpriority="auto" 
                    height="22" 
                    width="29.333333333333332" 
                    srcSet="https://rukminim2.flixcart.com/fk-p-flap/29/22/image/7ab4040af860941d.png?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/58/44/image/7ab4040af860941d.png?q=60 2x" 
                    src="https://rukminim2.flixcart.com/fk-p-flap/58/44/image/7ab4040af860941d.png?q=90" 
                    style={{ filter: 'none', opacity: 1, transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out', width: '100%', height: '100%', margin: 'auto', objectFit: 'contain', aspectRatio: '4 / 3' }} 
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexBasis: 'auto', flexFlow: 'column', flexShrink: 0, alignItems: 'stretch', minHeight: '0px', minWidth: '0px', position: 'relative', zIndex: 0, boxSizing: 'border-box', borderWidth: '0px', placeSelf: 'center' }}>
                <div style={{ display: 'flex', position: 'relative', width: '36.25px', height: '18px', flexShrink: 0 }}>
                  <img 
                    alt="Travel Text" 
                    aria-busy="false" 
                    data-highres-loaded="false" 
                    loading="lazy" 
                    fetchpriority="auto" 
                    height="18" 
                    width="36.25" 
                    srcSet="https://rukminim2.flixcart.com/fk-p-flap/36/18/image/5a9ff48eef96b876.png?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/72/36/image/5a9ff48eef96b876.png?q=60 2x" 
                    src="https://rukminim2.flixcart.com/fk-p-flap/72/36/image/5a9ff48eef96b876.png?q=90" 
                    style={{ filter: 'none', opacity: 1, transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out', width: '100%', height: '100%', margin: 'auto', objectFit: 'contain', aspectRatio: '145 / 72' }} 
                  />
                </div>
              </div>
            </Link>
          </div>
          
          <div className={styles.location} onClick={() => navigate(user ? '/checkout' : '/login')} style={{ cursor: 'pointer' }}>
            <MapPin size={16} color="#2874f0" />
            <span className={styles.locationText}>Location not set</span>
            <span className={styles.locationLink}>Select delivery location {'>'}</span>
          </div>
        </div>

        {/* Middle Row */}
        <div className={styles.middleRow}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} onClick={() => {
              if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }} style={{ cursor: 'pointer' }} />
            <input 
              type="text" 
              placeholder="Search for Products, Brands and More" 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
            />
          </div>

          <div className={styles.navActions}>
            <div className={styles.loginAction}>
              {user ? (
                <div className={styles.loginBtn}>
                  <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg" width="24" height="24" alt="Account" />
                  <span style={{marginLeft: "4px"}}>Account</span>
                  <ChevronDown size={16} style={{marginLeft: "4px"}} className={styles.arrowProps} />
                </div>
              ) : (
                <Link to="/login" className={styles.loginBtn}>
                  <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-6bae67.svg" width="24" height="24" alt="Login" />
                  <span style={{marginLeft: "4px"}}>Login</span>
                  <ChevronDown size={16} style={{marginLeft: "4px"}} className={styles.arrowProps} />
                </Link>
              )}
              
              <div className={styles.dropdownMenu}>
                {!user && (
                   <div className={styles.dropdownHeader}>
                     <span>New customer?</span>
                     <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
                   </div>
                )}
                <ul className={styles.dropdownList}>
                  <li><UserCircle size={18} /> My Profile</li>
                  <li><Star size={18} /> Flipkart Plus Zone</li>
                  <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}><li><Package size={18} /> Orders</li></Link>
                  <li><Heart size={18} /> Wishlist</li>
                  <li><Store size={18} /> Become a Seller</li>
                  <li><Gift size={18} /> Rewards</li>
                  <li><CreditCard size={18} /> Gift Cards</li>
                  {user && <li onClick={handleLogout} style={{ cursor: 'pointer' }}><LogOut size={18} /> Logout</li>}
                </ul>
              </div>
            </div>

            <div className={styles.moreAction}>
              <div className={styles.navItem}>
                <span>More</span> <ChevronDown size={16} className={styles.arrowProps} />
              </div>
              
              <div className={styles.dropdownMenu}>
                <ul className={styles.dropdownList}>
                  <li><Store size={18} /> Become a Seller</li>
                  <li><Bell size={18} /> Notification Settings</li>
                  <li><HeadphonesIcon size={18} /> 24x7 Customer Care</li>
                  <li><TrendingUp size={18} /> Advertise on Flipkart</li>
                </ul>
              </div>
            </div>

            <Link to="/cart" className={styles.navItem}>
              <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart_v4-6ac9a8.svg" alt="Cart" width="24" height="24" />
              <span>Cart</span>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Bottom Row - Categories */}
        <div className={`${styles.categoriesWrapper} ${isCollapsed ? styles.collapsedRow : styles.expandedRow}`}>
          <div className={styles.categoriesRow}>
          {categories.map((cat, idx) => {
            const isActive = cat.slug === '' 
              ? location.pathname === '/' 
              : location.pathname === `/category/${cat.slug}`;
            return (
              <Link 
                key={idx} 
                to={cat.slug === '' ? '/' : `/category/${cat.slug}`}
                className={`${styles.categoryItem} ${isActive ? styles.activeCategory : ''}`}
              >
                <div className={styles.catIcon}>
                  <img src={cat.image} alt={cat.name} className={styles.catImage} style={cat.image.endsWith('.svg') ? { width: '36px', height: '36px' } : undefined} />
                </div>
                <div className={styles.catName}>{cat.name}</div>
              </Link>
            );
          })}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
