import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { getProtected } from "../utils/api";

const Dashboard = () => {
    const { token, setToken, removeCookie } = useContext(AuthContext);
    const navigate = useNavigate();
    const getAuthId = async () => {
        try {
            const data = await getProtected(token);
            console.log(data);
        } catch (error) {
            console.log(error);
            removeCookie("token");
            setToken(null);
        }
    };

    const handleRemoveTokenCookie = () => {
        removeCookie("token");
        setToken(null);
    };

    useEffect(() => {
        if (token) {
            getAuthId();
        } else {
            navigate("/login");
        }
    }, [token]);

    return (
        <div className="w-screen min-h-screen bg-amber-600">
            <div className="fixed w-full h-28 bg-orange-100 px-12 flex justify-between items-center">
                <h1 className="text-4xl font-bold text-amber-600">bitly</h1>

                <nav>
                    <ul className="flex items-center gap-6 text-xl">
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Links</a>
                        </li>
                        <li>
                            <button
                                className="px-4 py-2 rounded-lg bg-amber-600"
                                onClick={handleRemoveTokenCookie}>
                                {token ? "Logout" : "Login"}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="h-28"></div>
            <div></div>
        </div>
    );
};

export default Dashboard;
