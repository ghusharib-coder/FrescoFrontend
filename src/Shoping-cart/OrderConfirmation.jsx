import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const USD_TO_PKR = 280;

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const transactionId = location.state?.transactionId;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="confirmation-container" style={{width:'100vw'}}>
      <div className="confirmation-card">
        <div className="success-checkmark">
          <div className="check-icon">✅</div>
        </div>

        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">Thank you for your purchase. Your order has been successfully placed.</p>

        <div className="confirmation-details">
          <div className="detail-section">
            <h3>📦 Order Number</h3>
            <p className="order-id">{order._id}</p>
          </div>

          <div className="detail-section">
            <h3>💰 Transaction ID</h3>
            <p className="transaction-id">{transactionId}</p>
          </div>

          <div className="detail-section">
            <h3>💵 Total Amount</h3>
            <p className="total-amount">Rs. {(order.totalPrice * USD_TO_PKR).toFixed(2)}</p>
          </div>

          <div className="detail-section">
            <h3>📍 Delivery Address</h3>
            <p>
              <strong>{order.deliveryAddress.fullName}</strong><br />
              {order.deliveryAddress.address}<br />
              {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}<br />
              📞 {order.deliveryAddress.phone}
            </p>
          </div>

          <div className="detail-section">
            <h3>📋 Items Ordered</h3>
            <div className="items-list">
              {order.items.map((item) => (
                <div key={item.productId} className="item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <div className="item-title">{item.name}</div>
                    <div className="item-meta">Qty: {item.quantity} × Rs. {(item.price * USD_TO_PKR).toFixed(2)}</div>
                  </div>
                  <div className="item-price">Rs. {((item.price * item.quantity) * USD_TO_PKR).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>📊 Order Status</h3>
            <div className="status-timeline">
              <div className="status-step active">
                <div className="step-number">1</div>
                <div className="step-label">Order Confirmed</div>
              </div>
              <div className="status-step">
                <div className="step-number">2</div>
                <div className="step-label">Processing</div>
              </div>
              <div className="status-step">
                <div className="step-number">3</div>
                <div className="step-label">Shipped</div>
              </div>
              <div className="status-step">
                <div className="step-number">4</div>
                <div className="step-label">Delivered</div>
              </div>
            </div>
          </div>

          <div className="important-info">
            <h3>ℹ️ Important Information</h3>
            <ul>
              <li>✓ Order confirmation has been sent to your email</li>
              <li>✓ You will receive SMS/WhatsApp updates about your order</li>
              <li>✓ Delivery typically takes 3-5 business days</li>
              <li>✓ Keep your order number safe for tracking</li>
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button className="primary-btn" onClick={() => navigate('/cart')}>
            🛒 Back to Shopping
          </button>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
