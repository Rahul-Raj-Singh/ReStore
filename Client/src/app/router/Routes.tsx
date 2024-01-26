import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetail from "../../features/catalog/ProductDetail";
import ServerErrorPage from "../error/ServerErrorPage";
import NotFoundPage from "../error/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },
            {
                path: "catalog",
                element: <Catalog/>
            },
            {
                path: "catalog/:productId",
                element: <ProductDetail/>
            },
            {
                path: "about",
                element: <AboutPage/>
            },
            {
                path: "contact",
                element: <ContactPage/>
            },
            {
                path: "server-error",
                element: <ServerErrorPage/>
            },
            {
                path: "*",
                element: <NotFoundPage/>
            }
        ]
    }
]);