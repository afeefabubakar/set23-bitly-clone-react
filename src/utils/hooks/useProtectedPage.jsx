import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProtected } from "../api";
import { AuthContext } from "../../App";

const useProtectedPage = () => {
    const { cookie, removeCookie } = useContext(AuthContext);
    const navigate = useNavigate();
    const getAuthId = async () => {
        try {
            const data = await getProtected(cookie.token).then(
                (res) => res.data
            );
        } catch (error) {
            removeCookie("token");
        }
    };

    useEffect(() => {
        if (cookie.token) {
            getAuthId();
        } else {
            navigate("/login");
        }
    }, [cookie.token]);
};

export default useProtectedPage;
