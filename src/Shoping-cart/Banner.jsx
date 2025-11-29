import Marquee from "react-fast-marquee";

const Banner = () => (
   <div className="banner-container">
      <Marquee gradient={false} speed={60} pauseOnHover>
        🛍️ Big Sale Today! | 🚚 Free Delivery on Orders Over $50 | 🎉 New Arrivals Every Week! | 💳 Secure Checkout | ⭐ Shop Now & Save More!
      </Marquee>
    </div>
);

export default Banner;
