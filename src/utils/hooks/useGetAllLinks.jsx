import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { getAllLinks } from "../api";

const useGetAllLinks = (deps = []) => {
    const { cookie } = useContext(AuthContext);
    const [linkState, setLinkState] = useState("pending");
    const [links, setLinks] = useState([]);

    const fetchLinks = async () => {
        try {
            setLinkState("loading");
            const resData = await getAllLinks(cookie.token);
            console.log(resData);
            setLinkState("success");
            setLinks(resData.data.links);
        } catch (error) {
            console.log(error);
            setLinkState("error");
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [...deps]);

    console.log(links);

    return { links, linkState, fetchLinks };
};

export default useGetAllLinks;
