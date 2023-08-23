import React, { useContext } from "react";
import { AuthContext } from "../App";

const Header = () => {
    const { cookie, removeCookie } = useContext(AuthContext);
    const handleRemoveTokenCookie = () => {
        removeCookie("token");
    };

    return (
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
                            {cookie.token ? "Logout" : "Login"}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
