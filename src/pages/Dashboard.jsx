import React from "react";
import useProtectedPage from "../utils/hooks/useProtectedPage";
import Header from "../components/Header";

const Dashboard = () => {
    useProtectedPage();

    return (
        <div className="w-screen min-h-screen bg-amber-600">
            <Header />
            <div className="h-28"></div>
            <div></div>
        </div>
    );
};

export default Dashboard;
