import React from "react";
import useProtectedPage from "../utils/hooks/useProtectedPage";
import Header from "../components/Header";

const DashboardLayout = ({ children }) => {
    useProtectedPage();

    return (
        <div className="flex w-screen min-h-screen bg-amber-600">
            <Header />
            {children}
        </div>
    );
};

export default DashboardLayout;
