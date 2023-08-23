import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { createContext } from "react";
import { useCookies } from "react-cookie";
import Links from "./pages/Links";

export const AuthContext = createContext(null);

function App() {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/links",
            element: <Links />,
        },
        {
            path: "*",
            element: <h1>404</h1>,
        },
    ]);
    return (
        <AuthContext.Provider
            value={{
                cookie,
                setCookie,
                removeCookie,
            }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

export default App;
