import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import styles from './Home.module.css';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = {};
        if (slug) {
          params.category = slug;
        }

        const [response] = await Promise.all([
          api.get('/products', { params }),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);
        
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const categoryTitle = slug 
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Suggested For You';

  // Group products for Home page
  const electronics = products.filter(p => ['Electronics', 'Appliances', 'Mobiles', 'Laptops'].includes(p.category));
  const fashion = products.filter(p => ['Fashion', 'Beauty'].includes(p.category));
  const others = products.filter(p => !['Electronics', 'Appliances', 'Mobiles', 'Laptops', 'Fashion', 'Beauty'].includes(p.category));

  const renderGroup = (title, productList, bgColor) => {
    if (!productList || productList.length === 0) return null;
    return (
      <div className={styles.groupContainer} style={{ backgroundColor: bgColor }}>
        <div className={styles.groupHeader}>
          <h2 className={styles.groupTitle}>{title}</h2>
          <div className={styles.arrowCircleBlack}>
            <ArrowRight color="white" size={16} strokeWidth={3} />
          </div>
        </div>
        <div className={styles.groupRow}>
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`container ${styles.homeContainer}`}>
      {/* Hero Ad Banner */}
      {(!slug || slug.toLowerCase() === 'appliances') && (
        <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://rukminim2.flixcart.com/fk-p-flap/2000/980/image/c9f052259d2684e0.png" 
            alt="Top Promo Ad"
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }} 
          />
        </div>
      )}

      {/* Promo Banners */}
      <div className={styles.bannerContainer}>
        {/* Banner 1 */}
        <div className={styles.bannerImageWrapper}>
          <img 
            src="https://rukminim2.flixcart.com/fk-p-flap/2000/980/image/1a445c84d1bb5579.png" 
            alt="Healthcare Promo" 
            className={styles.bannerImage}
          />
        </div>

        {/* Banner 2 */}
        <div className={styles.bannerImageWrapper}>
           <img 
              src="https://rukminim2.flixcart.com/fk-p-flap/2000/980/image/cf0d3949fe354967.png" 
              alt="Mobiles Promo" 
              className={styles.bannerImage}
            />
        </div>

        {/* Banner 3 */}
        <div className={styles.bannerImageWrapper}>
            <img 
              src="https://rukminim2.flixcart.com/fk-p-flap/2000/980/image/839a12988ca0b41c.jpg" 
              alt="Electronics Promo" 
              className={styles.bannerImage}
            />
        </div>
      </div>
      
      {loading ? (
        <div className={styles.productGrid}>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : slug ? (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{categoryTitle}</h2>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <>
          {renderGroup('Top Picks', others, '#fcf0e4')}
          {renderGroup('Best Gadgets & Appliances', electronics, '#e6e0fa')}
          {renderGroup('Widest collection', fashion, '#dceddf')}
        </>
      )}
    </div>
  );
};

export default Home;
