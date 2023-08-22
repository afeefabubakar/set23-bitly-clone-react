import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

function App() {
    const [token, setToken] = useState("");
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const setTokenCookie = (token) => {
        setCookie("token", token);
    };

    useEffect(() => {
        if (cookie.token) {
            setToken(cookie.token);
        }
    }, [cookie.token]);
    useEffect(() => {
        if (token) {
            setTokenCookie(token);
        }
    }, [token]);

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
    ]);
    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                cookie,
                setCookie,
                removeCookie,
                setTokenCookie,
            }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

export default App;
