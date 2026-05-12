import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About */}
        <div className="footer-section">
          <h4>🛍️ FRESCO Store</h4>
          <p>
            Your ultimate destination for quality products. Shop with confidence and enjoy
            the best deals online.
          </p>
          <div className="social-links">
            <Link to="#" title="Facebook">f</Link>
            <Link to="#" title="Twitter">𝕏</Link>
            <Link to="#" title="Instagram">📸</Link>
            <Link to="#" title="LinkedIn">in</Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section">
          <h4>🔗 Quick Links</h4>
          <ul>
            <li><Link to="/ShopingCart/Home">Home</Link></li>
            <li><Link to="/ShopingCart/Cart">Cart</Link></li>
            <li><Link to="/ShopingCart/About">About Us</Link></li>
            <li><Link to="/ShopingCart/Contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="footer-section">
          <h4>💬 Customer Service</h4>
          <ul>
            <li><Link to={'/ShopingCart/HelpFAQ'}>Help & FAQ</Link></li>
            <li><Link to={'/ShopingCart/ReturnsExchange'}>Returns & Exchange</Link></li>
            <li><Link to={'/ShopingCart/ShippingInfo'}>Shipping Info</Link></li>
            <li><Link to={'/ShopingCart/PrivacyPolicy'}>Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-section">
          <h4>📞 Get in Touch</h4>
          <p>📧 Email: <strong>support@fresco.com</strong></p>
          <p>📱 Phone: <strong>+123 456 789</strong></p>
          <p>⏰ Mon-Fri: 9AM-6PM</p>
          <p>📍 123 Fashion Street, Your City</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} FRESCO Store. All rights reserved. | Crafted with ❤️ for you</p>
        <div className="payment-methods">
          <span>💳 Secure Payment</span>
          <span>🔒 100% Safe</span>
          <span>🚚 Fast Delivery</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
