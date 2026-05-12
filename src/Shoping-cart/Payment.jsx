import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config.js';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || JSON.parse(localStorage.getItem('currentOrder'));

  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [easypaisaData, setEasypaisaData] = useState({
    accountNumber: '',
    pinCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  if (!order) {
    return (
      <div className="payment-error">
        <h2>❌ Order not found</h2>
        <button onClick={() => navigate('/cart')}>Back to Cart</button>
      </div>
    );
  }

  const handleEasypaisaChange = (e) => {
    const { name, value } = e.target;
    setEasypaisaData({
      ...easypaisaData,
      [name]: value,
    });
  };

  const validateEasypaisa = () => {
    if (!easypaisaData.accountNumber || easypaisaData.accountNumber.length < 10) {
      alert('❌ Invalid account number (minimum 10 digits)');
      return false;
    }
    if (!easypaisaData.pinCode || easypaisaData.pinCode.length < 4) {
      alert('❌ Invalid PIN code (minimum 4 digits)');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateEasypaisa()) return;

    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call backend to process payment
      const response = await fetch(`${API_BASE_URL}/order/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          accountNumber: easypaisaData.accountNumber,
          pinCode: easypaisaData.pinCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus('success');
        localStorage.removeItem('currentOrder');
        setTimeout(() => {
          navigate('/order-confirmation', { state: { order: data.order, transactionId: data.transactionId } });
        }, 2000);
      } else {
        setPaymentStatus('failed');
        alert('❌ ' + data.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      alert('❌ Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCashOnDelivery = async () => {
    setLoading(true);
    setPaymentStatus('processing');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch(`${API_BASE_URL}/order/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          accountNumber: 'COD',
          pinCode: '0000',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus('success');
        localStorage.removeItem('currentOrder');
        setTimeout(() => {
          navigate('/order-confirmation', { state: { order: data.order, transactionId: data.transactionId } });
        }, 1500);
      } else {
        setPaymentStatus('failed');
      }
    } catch (err) {
      console.error('COD error:', err);
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container" style={{width:'100vw'}}>
      <div className="payment-card">
        {/* Left - Order Summary */}
        <div className="order-summary-payment">
          <h2>📦 Order Summary</h2>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.productId} className="payment-item">
                <img src={item.image} alt={item.name} />
                <div className="payment-item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-qty">Qty: {item.quantity}</div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="delivery-info">
            <h3>📍 Delivery Address</h3>
            <p>
              <strong>{order.deliveryAddress.fullName}</strong><br />
              {order.deliveryAddress.address}<br />
              {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}<br />
              📞 {order.deliveryAddress.phone}
            </p>
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal:</span>
              <span>${order.totalPrice}</span>
            </div>
            <div className="price-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="price-row total">
              <span>Total Amount:</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Right - Payment Form */}
        <div className="payment-form">
          <h2>💳 Payment</h2>

          {paymentStatus === 'success' && (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Payment Successful!</h3>
              <p>Redirecting to confirmation...</p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="error-message">
              <div className="error-icon">❌</div>
              <h3>Payment Failed</h3>
              <p>Please try again</p>
            </div>
          )}

          {!paymentStatus && (
            <>
              <div className="payment-methods">
                <label className={`method-option ${paymentMethod === 'easypaisa' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="easypaisa"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-name">🔐 Easypaisa</span>
                  <span className="method-desc">Secure Payment</span>
                </label>

                <label className={`method-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-name">🚚 Cash on Delivery</span>
                  <span className="method-desc">Pay when delivered</span>
                </label>
              </div>

              {paymentMethod === 'easypaisa' && (
                <div className="easypaisa-form">
                  <div className="form-section">
                    <label className="section-label">Easypaisa Account Details</label>

                    <div className="form-group">
                      <label>Account Number *</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={easypaisaData.accountNumber}
                        onChange={handleEasypaisaChange}
                        placeholder="Enter 10-digit account number"
                        disabled={loading}
                        maxLength="20"
                      />
                    </div>

                    <div className="form-group">
                      <label>PIN Code *</label>
                      <input
                        type="password"
                        name="pinCode"
                        value={easypaisaData.pinCode}
                        onChange={handleEasypaisaChange}
                        placeholder="Enter 4-digit PIN"
                        disabled={loading}
                        maxLength="6"
                      />
                    </div>

                    <div className="info-box">
                      <span>ℹ️</span>
                      <p>Your payment information is secured and will be processed through Easypaisa's secure gateway.</p>
                    </div>
                  </div>

                  <button
                    className="pay-btn"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? '⏳ Processing...' : '💳 Pay Now'}
                  </button>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="cod-form">
                  <div className="cod-info">
                    <h3>💵 Cash on Delivery</h3>
                    <p>
                      You can pay <strong>${order.totalPrice}</strong> to our delivery person when the package arrives at your doorstep.
                    </p>
                    <div className="cod-details">
                      <div className="detail-item">
                        <span className="label">Total Amount:</span>
                        <span className="value">${order.totalPrice}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Delivery Time:</span>
                        <span className="value">3-5 Business Days</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="pay-btn"
                    onClick={handleCashOnDelivery}
                    disabled={loading}
                  >
                    {loading ? '⏳ Processing...' : '✓ Confirm Order'}
                  </button>
                </div>
              )}

              <button
                className="back-btn"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
