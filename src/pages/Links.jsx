import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../App";
import { getAllLinks } from "../utils/api";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";
import copyIcon from "../assets/icons/copy.svg";

const Links = () => {
    const { cookie } = useContext(AuthContext);
    const [fetchLinkState, setFetchLinkState] = useState("pending");
    const [copyStyle, setCopyStyle] = useState("px-6 py-2 text-lg");
    const [links, setLinks] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const fetchLinks = async () => {
        try {
            setFetchLinkState("loading");
            const data = await getAllLinks(cookie.token).then(
                (res) => res.data
            );
            console.log(data);
            setLinks(data.links);
            setFetchLinkState("success");
        } catch (error) {
            setFetchLinkState("error");
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-8 flex-auto min-h-0">
                <div className="flex justify-between mb-8">
                    <h4 className="text-orange-100 text-4xl font-bold">
                        Links
                    </h4>
                    <button className="bg-orange-100 hover:bg-orange-200 transition-all px-6 py-2 text-lg rounded">
                        New Link
                    </button>
                </div>
                <table className="bg-orange-100 w-full rounded-xl min-h-[600px] h-auto table-auto text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Destination</th>
                            <th>Link</th>
                            <th>Visit count</th>
                            <th>Created at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchLinkState === "success" && links.length === 0 && (
                            <tr>
                                <td colSpan="6">
                                    <p>There's nothing here</p>
                                    <button className="text-amber-600 underline">
                                        Create a new link
                                    </button>
                                </td>
                            </tr>
                        )}
                        {links &&
                            fetchLinkState === "success" &&
                            links.map((link, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <a href={link.link} target="_blank">
                                                {link.link}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                onClick={fetchLinks}
                                                href={`${BASE_URL}/${link.slug}`}
                                                target="_blank">
                                                {`${BASE_URL}/${link.slug}`}
                                            </a>
                                            <button
                                                className={copyStyle}
                                                onClick={(e) => {
                                                    e.target.style.animation =
                                                        "shake 0.5s ease-in-out";

                                                    navigator.clipboard.writeText(
                                                        `${BASE_URL}/${link.slug}`
                                                    );
                                                }}
                                                onAnimationEnd={(e) => {
                                                    e.target.style.animation =
                                                        "none";
                                                }}>
                                                <img src={copyIcon} alt="" />
                                            </button>
                                        </td>
                                        <td>{link.visit_counter}</td>
                                        <td>{link.created_at}</td>
                                        <td>
                                            <button className="bg-orange-100 hover:text-orange-100 hover:bg-amber-600 px-6 py-2 text-lg rounded transition-all">
                                                <img src={editIcon} alt="" />
                                            </button>
                                            <button className="bg-orange-100 hover:text-orange-100 hover:bg-amber-600 px-6 py-2 text-lg rounded transition-all">
                                                <img src={trashIcon} alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                        {fetchLinkState === "loading" && (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        )}

                        {fetchLinkState === "error" && (
                            <tr>
                                <td colSpan="6">
                                    Error fetching links. Please try again
                                    later.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Links;
