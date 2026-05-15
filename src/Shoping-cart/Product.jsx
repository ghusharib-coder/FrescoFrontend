import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { add } from "./cartSlice";
import { AddPopup} from "./Popup";
import { useDispatch } from "react-redux";
import { useState } from "react";

const USD_TO_PKR = 280;

const Product = () => {
    const [ShowPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { product } = location.state;

  const handleAddToCart = async () => {
    setIsLoading(true);
    if (product) {
      dispatch(add(product));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }
    setIsLoading(false);
  };

  return (
    <div className="products-page">
      <div className="product-page-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-page-detail">
        <div className="product-page-title" style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          <strong>{product.title}</strong>
        </div>
        <div className="product-page-title" style={{ textAlign: 'start', fontSize: '1.3rem', color: '#667eea' }}>
          <strong>💰 Price: Rs. {(product.price * USD_TO_PKR).toFixed(2)}</strong>
        </div>
        <div className="product-page-title" style={{ textAlign: 'start', fontSize: '1.2rem', color: '#ff9800' }}>
          <strong>⭐ Rating: {product.rating.rate}/5</strong>
        </div>
        <div className="product-page-title">
          <span style={{ fontSize: '1.1rem' }}>
            <strong>📝 Description:</strong>
          </span>
          <br/>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>{product.description}</p>
        </div>
        <button 
          className="product-page-button" 
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <b>{isLoading ? "⏳ Adding..." : "🛒 Add To Cart"}</b>
        </button>
      </div>
      {ShowPopup &&
              ReactDOM.createPortal(
                <AddPopup />,
                document.getElementById("new-root")
              )}{" "} 
    </div>
  );
};

export default Product;
