import App from "./App";
import HomePage from "./pages/HomePage";
import BankPage from "./pages/BankPage";
import StockPage from "./pages/StockPage";
import type { RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },

            { path: "bank", Component: BankPage },
            { path: "stock", Component: StockPage },
        ]
    },
]

export default routes;