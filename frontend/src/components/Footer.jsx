import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { Facebook, Twitter, Youtube, Instagram, Briefcase, Star, HelpCircle, Gift } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.linksGrid}>
            <div className={styles.column}>
              <h6 className={styles.colHeading}>ABOUT</h6>
              <Link to="#" className={styles.link}>Contact Us</Link>
              <Link to="#" className={styles.link}>About Us</Link>
              <Link to="#" className={styles.link}>Careers</Link>
              <Link to="#" className={styles.link}>Flipkart Stories</Link>
              <Link to="#" className={styles.link}>Press</Link>
              <Link to="#" className={styles.link}>Corporate Information</Link>
            </div>

            <div className={styles.column}>
              <h6 className={styles.colHeading}>GROUP COMPANIES</h6>
              <Link to="#" className={styles.link}>Myntra</Link>
              <Link to="#" className={styles.link}>Cleartrip</Link>
              <Link to="#" className={styles.link}>Shopsy</Link>
            </div>

            <div className={styles.column}>
              <h6 className={styles.colHeading}>HELP</h6>
              <Link to="#" className={styles.link}>Payments</Link>
              <Link to="#" className={styles.link}>Shipping</Link>
              <Link to="#" className={styles.link}>Cancellation & Returns</Link>
              <Link to="#" className={styles.link}>FAQ</Link>
            </div>

            <div className={styles.column}>
              <h6 className={styles.colHeading}>CONSUMER POLICY</h6>
              <Link to="#" className={styles.link}>Cancellation & Returns</Link>
              <Link to="#" className={styles.link}>Terms Of Use</Link>
              <Link to="#" className={styles.link}>Security</Link>
              <Link to="#" className={styles.link}>Privacy</Link>
              <Link to="#" className={styles.link}>Sitemap</Link>
              <Link to="#" className={styles.link}>Grievance Redressal</Link>
              <Link to="#" className={styles.link}>EPR Compliance</Link>
              <Link to="#" className={styles.link}>FSSAI Food Safety Connect App</Link>
            </div>
          </div>

          <div className={styles.addressGrid}>
            <div className={styles.addressCol}>
              <h6 className={styles.colHeading}>Mail Us:</h6>
              <div className={styles.addressText}>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </div>
              <div className={styles.colHeading} style={{ marginTop: '16px' }}>Social:</div>
              <div className={styles.socialRow}>
                <Facebook className={styles.socialIcon} />
                <Twitter className={styles.socialIcon} />
                <Youtube className={styles.socialIcon} />
                <Instagram className={styles.socialIcon} />
              </div>
            </div>

            <div className={styles.addressCol}>
              <h6 className={styles.colHeading}>Registered Office Address:</h6>
              <div className={styles.addressText}>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN : U51109KA2012PTC066107<br />
                Telephone: <a href="tel:044-45614700" className={styles.phoneLink}>044-45614700</a> / <a href="tel:044-67415800" className={styles.phoneLink}>044-67415800</a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <Link to="#" className={styles.bottomItem}>
            <Briefcase size={16} className={styles.bottomItemIcon} />
            Become a Seller
          </Link>
          <Link to="#" className={styles.bottomItem}>
            <Star size={16} className={styles.bottomItemIcon} />
            Advertise
          </Link>
          <Link to="#" className={styles.bottomItem}>
            <Gift size={16} className={styles.bottomItemIcon} />
            Gift Cards
          </Link>
          <Link to="#" className={styles.bottomItem}>
            <HelpCircle size={16} className={styles.bottomItemIcon} />
            Help Center
          </Link>
          <div className={styles.copyright}>
            © 2007-2026 Flipkart.com
          </div>
          <div className={styles.paymentMethods}>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payments" className={styles.paymentIcon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
