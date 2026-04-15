import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from './Home.module.css';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <h2 className={styles.sectionTitle}>Suggested For You</h2>
        <div className={styles.arrowCircle}>
          <ArrowRight color="white" size={16} strokeWidth={3} />
        </div>
      </div>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productGrid}>
          {/* Mapping exact mock images similar to the supplied image for a "Suggested For You" clothing section */}
          {[
            "https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/r/k/t/m-st10-vebnor-original-imagpw2ytpzv3z5x.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/612/612/xif0q/track-suit/y/7/f/xl-ts13-vebnor-original-imags3y7u4ztuzgx.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/j/t/a/m-t84-vebnor-original-imagrtqzxg2qszv7.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/9/b/h/l-half-tshirt-with-shorts-vebnor-original-imags3n6vbg3fhm3.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/u/v/v/m-t92-vebnor-original-imagrtqzugqy8w2v.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/612/612/xif0q/track-suit/7/m/m/l-ts15-vebnor-original-imagrqn7hwfzxhtr.jpeg?q=70"
          ].map((mockImg, index) => (
             <div key={`mock-${index}`} className={styles.mockProductCard}>
                 <img src={mockImg} alt="clothing" className={styles.mockProductImage} />
             </div>
          ))}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
