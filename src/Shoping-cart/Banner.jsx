import Marquee from "react-fast-marquee";

const Banner = () => (
   <div className="banner-container">
      <Marquee gradient={false} speed={80} pauseOnHover>
        🎉 <strong>BIG SALE TODAY!</strong> 🎉 | 🚚 <strong>FREE DELIVERY</strong> on orders over $50 | 💳 <strong>SECURE CHECKOUT</strong> | ⭐ <strong>TOP QUALITY PRODUCTS</strong> | 📦 <strong>FAST SHIPPING</strong> | 🎁 <strong>EXCLUSIVE DEALS!</strong>
      </Marquee>
    </div>
);

export default Banner;
