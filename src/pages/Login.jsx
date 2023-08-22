import React, { useContext, useEffect, useState } from "react";
import { get, set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getProtected, postLoginUser } from "../utils/api";
import { AuthContext } from "../App";

const Login = () => {
    const [loginState, setLoginState] = useState("pending");
    const { token, setToken, cookie, setTokenCookie } = useContext(AuthContext);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoginState("loading");
            const currentUser = await postLoginUser({
                identifier: data.identifier,
                password: data.password,
            });
            setToken(currentUser.jwt);
            setLoginState("success");
        } catch (error) {
            setLoginState("error");
            const serverError = error?.response?.data?.message || [];
            setError("identifier", { message: serverError });
            setError("password", { message: serverError });
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center gap-8 items-center bg-blue-600">
            <h1 className="text-white text-8xl font-bold tracking-tighter">
                bitly
            </h1>
            <div className="bg-white min-w-[600px] p-4 rounded">
                <h2 className="text-2xl mb-4">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block" htmlFor="username">
                        Email / Username
                    </label>
                    <input
                        className="border border-gray-400 rounded p-2 outline-none w-full"
                        type="text"
                        {...register("identifier", { required: true })}
                    />
                    {errors.identifier && (
                        <span className="text-blue-600">
                            {errors.identifier.message ||
                                "Identifier is required"}
                        </span>
                    )}

                    <label className="block" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border border-gray-400 rounded p-2 outline-none w-full"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && (
                        <span className="text-blue-600">
                            {errors.password.message || "Password is required"}
                        </span>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 p-2 w-full mt-4 text-white font-bold rounded">
                        Submit
                    </button>
                    <Link
                        to="/register"
                        className="block text-center text-blue-400 mt-2">
                        Don't have an account?
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
