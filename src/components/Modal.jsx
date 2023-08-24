import React from "react";

const Modal = ({ showModal, setShowModal, children }) => {
    return (
        showModal && (
            <div
                onClick={setShowModal}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-xl p-8 max-w-[600px] w-1/2 relative">
                    <div className="text-3xl absolute right-6 top-4">
                        <button onClick={setShowModal}>×</button>
                    </div>
                    {children}
                </div>
            </div>
        )
    );
};

export default Modal;
