import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import styles from './Home.module.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [response] = await Promise.all([
          api.get('/products', { params: { search: query } }),
          new Promise(resolve => setTimeout(resolve, 500))
        ]);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className={`container ${styles.homeContainer}`}>
      <div className={styles.searchResultsHeader}>
        <h2 className={styles.sectionTitle}>
          Search results for "<span style={{ color: '#2874f0' }}>{query}</span>"
        </h2>
        <p className={styles.resultCount}>
          {loading ? 'Searching...' : `${products.length} result${products.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {loading ? (
        <div className={styles.productGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No products found</h3>
          <p>Try searching with different keywords</p>
          <Link to="/" className={styles.goHomeBtn}>Back to Home</Link>
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

export default SearchResults;
