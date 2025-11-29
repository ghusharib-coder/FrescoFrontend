import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import ShopingCart from "./Shoping-cart/ShopingCart";
import Home from "./Shoping-cart/Home";
import Cart from "./Shoping-cart/Cart";
import { Provider } from "react-redux";
import Store from "./Shoping-cart/Store";
import Product from "./Shoping-cart/Product";
import About from "./Shoping-cart/About";
import Contact from "./Shoping-cart/Contact";
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
      ],
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
