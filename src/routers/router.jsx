import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import { Home } from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import ProductPage from "../pages/Сatalog/ProductPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import FavoritesPage from "../pages/favorites/Favorites.jsx";
import OrderPage from "../pages/order/OrderPage.jsx";
import Catalog from "../pages/Сatalog/Catalog.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/catalog",
                element: <Catalog/>,
            },
            {
                path: "/order",
                element: <OrderPage/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/product/:id",
                element: <ProductPage />,
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/favorites",
                element: <FavoritesPage />
            }
        ]
    },
]);

export default router;