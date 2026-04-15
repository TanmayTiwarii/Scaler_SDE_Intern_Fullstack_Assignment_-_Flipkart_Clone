import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/login', {
        email: e.target.email.value,
        password: e.target.password.value
      });
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.leftSidebar}>
          <div>
            <h1>Login</h1>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Login Graphic" />
        </div>
        
        <div className={styles.rightForm}>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <input type="email" name="email" placeholder="Enter Email/Mobile number" className={styles.inputField} required />
            </div>
            <div className={styles.inputGroup} style={{ marginBottom: '32px' }}>
              <input type="password" name="password" placeholder="Enter Password" className={styles.inputField} required />
            </div>
            
            <button type="submit" className={styles.submitBtn}>Login</button>
          </form>
          
          <Link to="/signup" className={styles.bottomText}>
            New to Flipkart? Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
