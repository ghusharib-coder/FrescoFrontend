import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { remove, setCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config.js';
import ReactDOM from "react-dom";
import { RemovePopup } from "./Popup";

const USD_TO_PKR = 280;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);
  const [ShowPopup, setShowPopup] = useState(false);

  // 🧾 Fetch user's cart on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/cart/${user._id}`
        );
        const data=await res.json();
        console.log(data.items);
        dispatch(setCart(data.items));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [dispatch]);

  // 🗑️ Remove from cart
  const handleEvent = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    dispatch(remove(productId));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);

    try {
      await axios.delete("https://fresco-backend-gray.vercel.app/api/users/remove", {
        data: { userId: user._id, productId },
      });
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // 🛍️ Handle Buy for Single Product
  const handleBuyProduct = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("❌ Please login to proceed");
      navigate('/login');
      return;
    }

    // Pass only this product to checkout
    navigate('/checkout', { state: { cartItems: [product] } });
  };

  // 🛍️ Handle Buy All (Checkout)
  const handleBuyAll = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("❌ Please login to proceed");
      navigate('/login');
      return;
    }

    if (products.length === 0) {
      alert("❌ Your cart is empty!");
      return;
    }

    // Pass all cart items to checkout
    navigate('/checkout', { state: { cartItems: products } });
  };

  const totalPrice = products.reduce((sum, product) => sum + parseFloat(product.price), 0).toFixed(2);

  return (
    <div className="cart" style={{ filter: ShowPopup && "blur(10px)",width:'100vw' }}>
      <h2>🛒 Your Shopping Cart</h2>
      <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#667eea', fontWeight: '600' }}>
        Total Items: {products.length} | Total Price: <span style={{ color: '#ff6b6b', fontSize: '1.4rem' }}>Rs. {(totalPrice * USD_TO_PKR).toFixed(2)}</span>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#999', fontSize: '1.1rem' }}>
          <p>🛍️ Your cart is empty. Start shopping!</p>
        </div>
      ) : (
        <>
          {products.map((product) => (
            <div key={product.productId} className="cart-products">
              <div className="cart-product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="cart-product-detail">
                <div className="product-title">
                  <strong>{product.name}</strong>
                </div>
                <div className="product-price">
                  <strong>💰 Rs. {(product.price * USD_TO_PKR).toFixed(2)}</strong>
                </div>
                <div className="product-description">
                  <strong>📝 Description:</strong> {product.description}
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
                  <button
                    className="cart-button"
                    onClick={() => handleEvent(product.productId)}
                  >
                    <b>🗑️ Remove</b>
                  </button>
                  <button
                    className="cart-button" style={{background:'green'}}
                    onClick={() => handleBuyProduct(product)}
                  >
                    <b>💳 Buy Now</b>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Buy All Button */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              style={{
                flex: 1,
                padding: '1rem',
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onClick={handleBuyAll}
            >
              ✅ Buy All Items
            </button>
          </div>
        </>
      )}

      {ShowPopup &&
        ReactDOM.createPortal(
          <RemovePopup />,
          document.getElementById("new-root")
        )}
    </div>
  );
};

export default Cart;
