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

        console.log('Fetching products with slug:', slug, 'params:', params);
        
        const [response] = await Promise.all([
          api.get('/products', { params }),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);
        
        console.log('Products received:', response.data.products.length);
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

  return (
    <div className={`container ${styles.homeContainer}`}>
      {/* Promo Banners */}
      <div className={styles.bannerContainer}>
        {/* Banner 1: Healthcare */}
        <div className={styles.bannerImageWrapper}>
          <img 
            src="https://rukminim1.flixcart.com/fk-p-flap/700/300/image/cd94f2d3ec3d7904.png?q=90" 
            alt="Healthcare essentials" 
            className={styles.bannerImage}
            onError={(e) => { e.target.src = "https://placehold.co/700x300/e6f2ec/025d43?text=Healthcare+essentials+Up+to+80%25+Off" }}
          />
        </div>

        {/* Banner 2: vivo T5x */}
        <div className={styles.bannerImageWrapper}>
           <img 
              src="https://rukminim1.flixcart.com/fk-p-flap/700/300/image/3d6ce704afcd3243.png?q=90" 
              alt="vivo T5x 5G" 
              className={styles.bannerImage}
              onError={(e) => { e.target.src = "https://placehold.co/700x300/f8e9ea/c6000e?text=vivo+T5x+5G" }}
            />
        </div>

        {/* Banner 3: SAMSUNG */}
        <div className={styles.bannerImageWrapper}>
            <img 
              src="https://rukminim1.flixcart.com/fk-p-flap/700/300/image/d00e62df94dcd87b.png?q=90" 
              alt="SAMSUNG Galaxy" 
              className={styles.bannerImage}
              onError={(e) => { e.target.src = "https://placehold.co/700x300/e0ebf9/1c4587?text=SAMSUNG+Galaxy+S25+FE" }}
            />
        </div>
      </div>
      
      {/* Product Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{categoryTitle}</h2>
        <div className={styles.arrowCircle}>
          <ArrowRight color="white" size={16} strokeWidth={3} />
        </div>
      </div>
      
      {loading ? (
        <div className={styles.productGrid}>
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
