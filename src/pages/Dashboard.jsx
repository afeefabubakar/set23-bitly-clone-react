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
        } catch (error) {
            console.log(error);
            removeCookie("token");
            setToken(null);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            getAuthId();
        }
    }, [token]);

    return <div>Dashboard</div>;
};

export default Dashboard;
