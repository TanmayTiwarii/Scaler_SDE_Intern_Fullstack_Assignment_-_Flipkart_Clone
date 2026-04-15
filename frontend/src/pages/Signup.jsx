import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (error) {
      console.error('Signup error', error);
      alert('Signup failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.leftSidebar}>
          <div>
            <h1>Looks like you're new here!</h1>
            <p>Sign up with your mobile number to get started</p>
          </div>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Signup Graphic" />
        </div>
        
        <div className={styles.rightForm}>
          <form onSubmit={handleSignup}>
            <div className={styles.inputGroup}>
              <input type="text" name="name" placeholder="Full Name" className={styles.inputField} required />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" name="email" placeholder="Enter Email/Mobile number" className={styles.inputField} required />
            </div>
            <div className={styles.inputGroup} style={{ marginBottom: '32px' }}>
              <input type="password" name="password" placeholder="Create Password" className={styles.inputField} required />
            </div>
            
            <button type="submit" className={styles.submitBtn}>Continue</button>
          </form>
          
          <Link to="/login" className={styles.bottomText} style={{ background: '#fff', color: '#2874f0', border: '1px solid #f0f0f0', padding: '12px', marginTop: 'auto', textDecoration: 'none', display: 'block', boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)' }}>
            Existing User? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
