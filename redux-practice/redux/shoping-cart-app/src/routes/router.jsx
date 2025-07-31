import { createBrowserRouter } from "react-router";
import App from "../App";
import Cart from "../fetures/cart/Cart";
import ProductView from "../fetures/products/ProductView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: ProductView,
      },
      {
        path: "/cart",
        Component: Cart,
      },
    ],
  },
]);
