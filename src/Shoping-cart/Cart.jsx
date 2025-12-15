import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { remove, setCart } from "./cartSlice"; // <-- add `setCart` action to update store from backend
import ReactDOM from "react-dom";
import { RemovePopup } from "./Popup";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const [ShowPopup, setShowPopup] = useState(false);

  // 🧾 Fetch user's cart on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchCart = async () => {
      if (!user) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/cart/${user._id}`
        );
        const data=await res.json();
        console.log(data.items);
        dispatch(setCart(data.items));
        // const data = await res.json();
        // dispatch(setCart(res.data));
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

  return (
    <div className="cart" style={{ filter: ShowPopup && "blur(10px)" }}>
      <h2 style={{ color: "purple" }}>Your Cart Items: {products.length}</h2>

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
              <strong>Price: ${product.price}</strong>
            </div>
            <div className="product-description">
              <strong>Description:</strong> {product.description}
            </div>
            <button
              className="cart-button"
              onClick={() => handleEvent(product.productId)}
            >
              <b>Remove From Cart</b>
            </button>
          </div>
          
        </div>
      ))}

      {ShowPopup &&
        ReactDOM.createPortal(
          <RemovePopup />,
          document.getElementById("new-root")
        )}
    </div>
  );
};

export default Cart;
