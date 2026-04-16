import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Heart, Share2, ChevronDown, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div style={{ padding: '24px', textAlign: 'center' }}>Product not found</div>;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const allImages = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className={styles.pageBackground}>
      <div className={styles.breadcrumbs}>
         Home / {product.category || 'Clothing and Accessories'} / {product.title}
      </div>

      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.carouselContainer}>
            {/* Thumbnails */}
            <div className={styles.thumbnailList}>
              {allImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbWrap} ${activeImage === idx ? styles.activeThumb : ''}`}
                  onMouseEnter={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className={styles.thumbImg} />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className={styles.mainImageContainer}>
              <img src={allImages[activeImage]} alt={product.title} className={styles.mainImage} />
              <div className={styles.floatingIcons}>
                <div className={styles.iconCircle}><Heart size={18} /></div>
                <div className={styles.iconCircle}><Share2 size={18} /></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          {/* Small AD Info snippet */}
          <div className={styles.adCard}>
             <img src={product.image} className={styles.adImg} alt="ad thumbnail" />
             <div className={styles.adInfo}>
                <div className={styles.adTitle}>
                  {product.title.length > 35 ? product.title.substring(0, 35) + '...' : product.title}
                  <span className={styles.adBadge}>AD</span>
                </div>
                <div className={styles.adPrice}>
                   <span className={styles.adDiscount}>↓{discount}%</span> 
                   <span className={styles.adOriginal}>{product.originalPrice.toLocaleString('en-IN')}</span> 
                   <span className={styles.adCurrent}>₹{product.price.toLocaleString('en-IN')}</span>
                </div>
             </div>
          </div>

          <div className={styles.selectionBlock}>
             <div className={styles.selectionTitle}>Selected Color: <span>Black</span></div>
             <div className={styles.thumbnailRow}>
                <div className={`${styles.colorThumb} ${styles.colorActive}`}>
                   <div style={{ width: '100%', height: '100%', backgroundColor: '#000', borderRadius: '4px' }}></div>
                </div>
                <div className={styles.colorThumb}>
                   <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px' }}></div>
                </div>
             </div>
          </div>

          {product.category?.toLowerCase() === 'fashion' && (
            <div className={styles.selectionBlock}>
               <div className={styles.selectionTitle}>Select Size <span className={styles.sizeChartText}>Size Chart</span></div>
               <div className={styles.sizeRow}>
                  <button className={styles.sizeBtn}>S</button>
                  <button className={styles.sizeBtn}>M</button>
                  <button className={styles.sizeBtn}>L</button>
                  <button className={styles.sizeBtn}>XL</button>
               </div>
            </div>
          )}

          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.ratingRow}>
             <div className={styles.ratingBadge}>
               {product.rating} <Star size={12} fill="currentColor" className={styles.ratingStar} />
             </div>
             <span className={styles.ratingCount}>| 1,740</span>
          </div>
          
          <div className={styles.hotDeal}>Hot Deal</div>
          
          <div className={styles.priceSection}>
             <span className={styles.discountArrow}>↓</span>
             <span className={styles.discountText}>{discount}%</span>
             <span className={styles.originalPrice}>{product.originalPrice.toLocaleString('en-IN')}</span>
             <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          </div>
          
          <div className={styles.offersBanner}>
             <div className={styles.offersLeft}>
                <span className={styles.wowDeal}>WOW! DEAL</span>
                <span className={styles.offersText}>Apply offers for maximum savings</span>
             </div>
             <ChevronDown size={20} />
          </div>
          
          <div className={styles.actionButtons}>
             <button className={styles.addBtn} onClick={handleAddToCart}>
                Add to cart
             </button>
             <button className={styles.buyBtn} onClick={handleBuyNow}>
                Buy at ₹{product.price.toLocaleString('en-IN')}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
