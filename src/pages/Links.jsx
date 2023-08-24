import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../App";
import { deleteLink, editLink, getAllLinks } from "../utils/api";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";
import copyIcon from "../assets/icons/copy.svg";
import Modal from "../components/Modal";
import NewLinkForm from "../components/NewLinkForm";
import { useForm } from "react-hook-form";

const Links = () => {
    const { cookie } = useContext(AuthContext);
    const [linkState, setLinkState] = useState("pending");
    const [editState, setEditState] = useState(false);
    const [editIndex, setEditIndex] = useState();
    const [links, setLinks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit } = useForm();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleToggleModal = () => setShowModal(!showModal);

    const fetchLinks = async () => {
        try {
            setLinkState("loading");
            const resData = await getAllLinks(cookie.token).then(
                (res) => res.data
            );

            setLinks(resData.links);
            setLinkState("success");
        } catch (error) {
            setLinkState("error");
        }
    };

    const handleEditLink = async (data, id) => {
        try {
            await editLink(cookie.token, id, data.link);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditLinkToggle = (index) => {
        if (editIndex === index) {
            setEditIndex(undefined);
            return;
        }
        setEditIndex(index);
    };

    useEffect(() => {
        if (editIndex === undefined) {
            setEditState(false);
            return;
        }
        setEditState(true);
    }, [editIndex]);

    const handleDeleteLink = async (id) => {
        try {
            await deleteLink(cookie.token, id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <DashboardLayout>
            <Modal showModal={showModal}>
                <NewLinkForm setShowModal={handleToggleModal} />
            </Modal>
            <div className="p-8 flex-auto min-h-0">
                <div className="flex justify-between mb-8">
                    <h4 className="text-orange-100 text-4xl font-bold">
                        Links
                    </h4>
                    <button
                        onClick={setShowModal}
                        className="bg-orange-100 hover:bg-orange-200 transition-all px-6 py-2 text-lg rounded">
                        New Link
                    </button>
                </div>
                <table className="bg-orange-100 w-full rounded-xl table-auto">
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
                    <tbody className="text-center">
                        {linkState === "success" && links.length === 0 && (
                            <tr>
                                <td colSpan="6">
                                    <p>There's nothing here</p>
                                    <button
                                        className="text-amber-600 underline"
                                        onClick={() => handleToggleModal()}>
                                        Create a new link
                                    </button>
                                </td>
                            </tr>
                        )}
                        {links &&
                            linkState === "success" &&
                            links.map((link, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {editState &&
                                                editIndex === index && (
                                                    <form
                                                        onSubmit={handleSubmit(
                                                            (data) =>
                                                                handleEditLink(
                                                                    data,
                                                                    link.id
                                                                )
                                                        )}
                                                        className="flex flex-row justify-between gap-2">
                                                        <input
                                                            className="resize-none bg-orange-100 h-6 w-full outline"
                                                            type="text"
                                                            defaultValue={
                                                                link.link
                                                            }
                                                            {...register(
                                                                "link"
                                                            )}
                                                        />
                                                        <button>✔️</button>
                                                    </form>
                                                )}
                                            {(!editState ||
                                                (editState &&
                                                    editIndex !== index)) && (
                                                <a
                                                    href={link.link}
                                                    target="_blank">
                                                    {link.link}
                                                </a>
                                            )}
                                        </td>
                                        <td>
                                            <a
                                                onClick={fetchLinks}
                                                href={`${BASE_URL}/${link.slug}`}
                                                target="_blank">
                                                {`${BASE_URL}/${link.slug}`}
                                            </a>
                                            <button
                                                className="px-6 py-2 text-lg"
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
                                        <td>
                                            {new Date(
                                                link.created_at
                                            ).toLocaleTimeString("en-uk", {
                                                month: "numeric",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() =>
                                                    handleEditLinkToggle(index)
                                                }
                                                className="bg-orange-100 hover:text-orange-100 hover:bg-amber-600 px-6 py-2 text-lg rounded transition-all">
                                                <img src={editIcon} alt="" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteLink(link.id)
                                                }
                                                className="bg-orange-100 hover:text-orange-100 hover:bg-amber-600 px-6 py-2 text-lg rounded transition-all">
                                                <img src={trashIcon} alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                        {linkState === "loading" && (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        )}

                        {linkState === "error" && (
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
