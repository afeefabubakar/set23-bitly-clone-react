import React from "react";
import useProtectedPage from "../utils/hooks/useProtectedPage";

const Links = () => {
    useProtectedPage();

    return <div>Links</div>;
};

export default Links;
