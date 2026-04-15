import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, User } from 'lucide-react';
import styles from './Navbar.module.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: 'For You', image: 'https://static-assets-web.flixcart.com/apex-static/images/svgs/L1Nav/all.svg' },
    { name: 'Fashion', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100' },
    { name: 'Mobiles', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/22fddf3c7da4c4f4.png?q=100' },
    { name: 'Beauty', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/d30ca78dc0ee8af9.png?q=100' },
    { name: 'Electronics', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/69c6589653afdb9a.png?q=100' },
    { name: 'Home', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/ab7e2b022a4587dd.jpg?q=100' },
    { name: 'Appliances', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0f39ac250ce733cf.png?q=100' },
    { name: 'Toys, ba...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/d154c0b4d536c1cf.png?q=100' },
    { name: 'Food & H...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/71050627a56b4693.png?q=100' },
    { name: 'Auto Acc...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/d30ca78dc0ee8af9.png?q=100' },
    { name: '2 Wheele...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0f39ac250ce733cf.png?q=100' },
    { name: 'Sports & ...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/d154c0b4d536c1cf.png?q=100' },
    { name: 'Books & ...', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/ab7e2b022a4587dd.jpg?q=100' },
    { name: 'Furniture', image: 'https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100' },
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
          
          <div className={styles.location}>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/pin-4d436a.svg" alt="pin" className={styles.pinIcon} />
            <span className={styles.locationText}>Location not set</span>
            <span className={styles.locationLink}>Select delivery location {'>'}</span>
          </div>
        </div>

        {/* Middle Row */}
        <div className={styles.middleRow}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Search for Products, Brands and More" 
              className={styles.searchInput}
            />
          </div>

          <div className={styles.navActions}>
            <div className={styles.loginAction}>
              <Link to="/login" className={styles.loginBtn}>
                <User size={20} /> <span style={{marginLeft: "4px"}}>Login</span> <ChevronDown size={16} style={{marginLeft: "4px"}} />
              </Link>
            </div>

            <div className={styles.navItem}>
              <span>More</span> <ChevronDown size={16} />
            </div>

            <Link to="/cart" className={styles.navItem}>
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* Bottom Row - Categories */}
        <div className={styles.categoriesRow}>
          {categories.map((cat, idx) => (
            <div key={idx} className={`${styles.categoryItem} ${cat.name === 'For You' ? styles.activeCategory : ''}`}>
              <div className={styles.catIcon}>
                <img src={cat.image} alt={cat.name} className={styles.catImage} style={cat.name === 'For You' ? { width: '36px', height: '36px' } : undefined} />
              </div>
              <div className={styles.catName}>{cat.name}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
