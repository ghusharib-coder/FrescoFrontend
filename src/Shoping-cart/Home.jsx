import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { fetchdata } from "./HomeSlice";
import { add } from "./cartSlice";
import API_BASE_URL from '../config.js';
import { AddPopup, DuplicatePopup } from "./Popup";
import Banner from "./Banner";
const Home = () => {
  const dispatch = useDispatch();
  const [ShowPopup, setShowPopup] = useState(false);
  const [ShowDuplicatePopup, setShowDuplicatePopup] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { products, isloading } = useSelector((state) => state.home);
  const cartItems = useSelector((state) => state.cart.products);
  const ProductImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc("./src/Shoping-cart/soldout.jpeg")}
      />
    );
  };
  useEffect(() => {
    dispatch(fetchdata());
  }, []);
  const handleEvent = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please log in first");
    return;
  }
  
  setLoadingProductId(product.id);
  
  try {
    const res=await fetch(`https://fresco-backend-gray.vercel.app/api/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify( {
      userId: user._id,
      productId: product.id,
      name: product.title,
      price: product.price,
      description:product.description,
      image: product.image,
    })
  })
    if(res.ok){
      dispatch(add(product));
      setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  }
  else{
    setShowDuplicatePopup(true);
     setTimeout(() => setShowDuplicatePopup(false), 1000);
  }
}
catch (error) {
    console.error(error);
    alert("Failed to add item to cart");
  }
  finally {
    setLoadingProductId(null);
  }
};

  const handleDragStart = (e, product) => {
    e.target.style.opacity = 0.5;
    e.dataTransfer.setData("Product", JSON.stringify(product));
  };
  const handleDragEnd = (e) => {
    e.preventDefault();
    e.target.style.opacity = 1;
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const productData = e.dataTransfer.getData("Product");
    if (productData) {
      const product = JSON.parse(productData);
      dispatch(add(product));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Shoping-cart">
      <div id="Shoping-cart-banner">
        <Banner/>
      </div>
      <div id="Shoping-cart-home" style={{ filter: ShowPopup ? "blur(10px)": "none" }}>
      {" "}
      <div className="cart-icon">
        {" "}
        <div
          className="icon"
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          {" "}
          <Link to={"/ShopingCart/Cart"}>🛒</Link>{" "}
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {isloading
        ? "Loading ALL Products"
        : products.map((product) => (
            <div
              className="products"
              draggable
              onDragStart={(e) => {
                handleDragStart(e, product);
              }}
              onDragEnd={(e) => {
                handleDragEnd(e);
              }}
            >
              {" "}
              <div className="Home-product-details">
                {" "}
                {console.log("hello")}{" "}
                <Link to={"/ShopingCart/Product"} state={{ product }}>
                  {" "}
                  <div className="product-title">
                    {" "}
                    <strong>{product.title}</strong>{" "}
                  </div>{" "}
                  <div className="product-image">
                    {" "}
                    <ProductImage
                      src={product.image}
                      alt={product.title}
                    />{" "}
                  </div>{" "}
                  <div className="product-price">
                    {" "}
                    <strong>Price: ${product.price}</strong>{" "}
                  </div>{" "}
                </Link>{" "}
              </div>{" "}
              <div className="Home-product-button">
                {" "}
                <button
                  className="home-button"
                  onClick={() => {
                    handleEvent(product);
                  }}
                  disabled={loadingProductId === product.id}
                >
                  {" "}
                  <b>{loadingProductId === product.id ? "⏳ Adding..." : "🛒 Add to Cart"}</b>{" "}
                </button>{" "}
              </div>{" "}
            </div>
          ))}{" "}
      {ShowPopup &&
        ReactDOM.createPortal(
          <AddPopup />,
          document.getElementById("new-root")
        )}{" "}
      {ShowDuplicatePopup &&
        ReactDOM.createPortal(
          <DuplicatePopup/>,
          document.getElementById("new-root")
        )}{" "}
      </div>
    </div>
  );
};
export default Home;
