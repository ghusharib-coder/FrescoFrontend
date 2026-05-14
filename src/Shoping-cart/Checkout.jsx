import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API_BASE_URL from '../config.js';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const items = location.state?.cartItems;
    if (!items || items.length === 0) {
      navigate('/cart');
      return;
    }
    
    setCartItems(items);
    
    const initialQuantities = items.reduce((acc, item) => {
      acc[item.productId] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [location, navigate]);

  const [deliveryData, setDeliveryData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('easypaisa');

  const handleQuantityChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setQuantities({
      ...quantities,
      [productId]: newValue,
    });
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData({
      ...deliveryData,
      [name]: value,
    });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * (quantities[item.productId] || 1), 0)
      .toFixed(2);
  };

  const handleProceedToPayment = async () => {
    if (
      !deliveryData.fullName ||
      !deliveryData.phone ||
      !deliveryData.email ||
      !deliveryData.address ||
      !deliveryData.city ||
      !deliveryData.zipCode
    ) {
      alert('❌ Please fill all delivery details');
      return;
    }

    const orderItems = cartItems.map((item) => ({
      ...item,
      quantity: quantities[item.productId] || 1,
    }));

    const orderData = {
      userId: JSON.parse(localStorage.getItem('user'))._id,
      items: orderItems,
      totalPrice: parseFloat(calculateTotal()),
      deliveryAddress: deliveryData,
      paymentMethod,
    };

    try {
      const response = await fetch(`https://fresco-backend-gray.vercel.app/api/users/order/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('currentOrder', JSON.stringify(data.order));
        navigate('/payment', { state: { order: data.order } });
      } else {
        alert('❌ ' + data.message);
      }
    } catch (err) {
      console.error('Error creating order:', err);
      alert('❌ Failed to create order');
    }
  };

  const totalPrice = calculateTotal();

  return (
    <div className="checkout-container" style={{width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
      {/* Header with Progress */}
      <div className="checkout-header">
        <p style={{fontSize:'20px',padding:'10px',textAlign:'center'}}>Fresco Secure Checkout</p>
        <div className="progress-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-label">Delivery</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-label">Payment</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">Confirmation</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-content">
        {/* Left - Delivery Form */}
        <div className="checkout-form">
          <h2>Delivery Information</h2>

          <div className="form-section-title">Personal Details</div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={deliveryData.fullName}
              onChange={handleDeliveryChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={deliveryData.email}
                onChange={handleDeliveryChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={deliveryData.phone}
                onChange={handleDeliveryChange}
                placeholder="0300 1234567"
              />
            </div>
          </div>

          <div className="form-section-title">Shipping Address</div>

          <div className="form-group">
            <label>Street Address</label>
            <textarea
              name="address"
              value={deliveryData.address}
              onChange={handleDeliveryChange}
              placeholder="123 Main Street, Apt 4B"
              rows="2"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={deliveryData.city}
                onChange={handleDeliveryChange}
                placeholder="Karachi"
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={deliveryData.zipCode}
                onChange={handleDeliveryChange}
                placeholder="75500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-method">
            <h3>Payment Method</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="easypaisa"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Easypaisa (Pay Now)
              </label>
              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  <div className="item-quantity-control">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantities[item.productId] || 1}
                      onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                    />
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * (quantities[item.productId] || 1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="total-row final">
              <span>Order Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <div className="button-group">
            <button className="proceed-btn" onClick={handleProceedToPayment}>
              Continue to Payment
            </button>
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
