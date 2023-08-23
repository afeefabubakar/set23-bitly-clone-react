import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createNewLink } from "../utils/api";
import { AuthContext } from "../App";
import NewLinkForm from "./NewLinkForm";

const Modal = ({ showModal, setShowModal, children }) => {
    const { handleSubmit, register } = useForm();
    const { cookie } = useContext(AuthContext);

    // Create a submit link function with axios
    const submitLink = async (data) => {
        try {
            await createNewLink(cookie.token, data.link);
            setShowModal();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return showModal && { children };
};

export default Modal;
