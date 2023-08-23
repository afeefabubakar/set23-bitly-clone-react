import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const NAV = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        name: "Links",
        path: "/links",
    },
];

const Header = () => {
    const { cookie, removeCookie } = useContext(AuthContext);
    const handleRemoveTokenCookie = () => {
        removeCookie("token");
    };

    return (
        <>
            <div className="fixed w-80 h-full bg-orange-100 p-8 flex flex-col justify-between">
                <div>
                    <Link to="/" className="w-max">
                        <h1 className="text-4xl font-extrabold text-amber-600 mb-4">
                            bitly
                        </h1>
                    </Link>

                    <nav>
                        <ul className="flex flex-col gap-2 text-xl">
                            {NAV.map((link, index) => {
                                return (
                                    <Link key={index} to={link.path}>
                                        <li>{link.name}</li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <button
                    className="px-4 py-2 rounded-lg text-lg font-bold text-white bg-amber-600 hover:bg-amber-600/90 transition-all"
                    onClick={handleRemoveTokenCookie}>
                    {cookie.token ? "Logout" : "Login"}
                </button>
            </div>
            <div className="w-80"></div>
        </>
    );
};

export default Header;
