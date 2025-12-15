import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { add } from "./cartSlice";
import { AddPopup} from "./Popup";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Product = () => {
    const [ShowPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { product } = location.state;

  return (
    <div className="products-page">
      <div className="product-page-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-page-detail">
        <div
          className="product-page-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <strong>{product.title}</strong>
        </div>
        <div
          className="product-page-title"
          style={{ display: "flex", justifyContent: "start" }}
        >
          <strong>Price: ${product.price}</strong>
        </div>
        <div
          className="product-page-title"
          style={{ display: "flex", justifyContent: "start" }}
        >
          <strong>Rating :⭐ {product.rating.rate}</strong>
        </div>
        <div className="product-page-title">
          <span>
            <strong>Description:</strong>
          </span>
          <br></br> ${product.description}
        </div>
        <button className="product-page-button" onClick={()=>{
          if (product) {
                dispatch(add(product));
                setShowPopup(true);
                setTimeout(() => {
                  setShowPopup(false);
                }, 1000);
              }
        }}>
          <b>Add To Cart</b>
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
