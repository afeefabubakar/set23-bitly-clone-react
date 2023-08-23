import React from "react";

const NewLinkForm = () => {
    return (
        <div
            onClick={setShowModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-8 max-w-[600px] w-1/2 relative">
                <div className="text-3xl absolute right-6 top-4">
                    <button onClick={setShowModal}>×</button>
                </div>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Create New Link
                </h1>
                <form
                    onSubmit={handleSubmit(submitLink)}
                    className="flex flex-col items-center w-full gap-4 ">
                    <input
                        type="text"
                        placeholder="https://www.example.com"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none"
                        {...register("link", { required: true })}
                    />
                    <button className="bg-amber-600 w-40 hover:bg-amber-700 transition-all rounded-lg px-4 py-2 text-white font-bold">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewLinkForm;
