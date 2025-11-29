import { useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
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
        <button className="product-page-button">
          <b>Remove From Cart</b>
        </button>
      </div>
    </div>
  );
};

export default Product;
