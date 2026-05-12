import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import ShopingCart from "./Shoping-cart/ShopingCart";
import Home from "./Shoping-cart/Home";
import Cart from "./Shoping-cart/Cart";
import Checkout from "./Shoping-cart/Checkout";
import Payment from "./Shoping-cart/Payment";
import OrderConfirmation from "./Shoping-cart/OrderConfirmation";
import { Provider } from "react-redux";
import Store from "./Shoping-cart/Store";
import Product from "./Shoping-cart/Product";
import About from "./Shoping-cart/About";
import Contact from "./Shoping-cart/Contact";
import HelpFAQ from "./Shoping-cart/HelpFAQ";
import ReturnsExchange from "./Shoping-cart/ReturnsExchange";
import ShippingInfo from "./Shoping-cart/ShippingInfo";
import PrivacyPolicy from "./Shoping-cart/PrivacyPolicy";
import TogglePage from "./components/TogglePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TogglePage />,
    },

    {
      path: "/ShopingCart",
      element: <ShopingCart />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Home",
          element: <Home />,
        },
        {
          path: "Cart",
          element: <Cart />,
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "Contact",
          element: <Contact />,
        },
        {
          path: "Product",
          element: <Product />,
        },
        {
          path: "HelpFAQ",
          element: <HelpFAQ />,
        },
        {
          path: "ReturnsExchange",
          element: <ReturnsExchange />,
        },
        {
          path: "ShippingInfo",
          element: <ShippingInfo />,
        },
        {
          path: "PrivacyPolicy",
          element: <PrivacyPolicy />,
        },
      ],
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/order-confirmation",
      element: <OrderConfirmation />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);
  return (
    <div>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
