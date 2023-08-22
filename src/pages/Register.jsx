import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postRegisterUser } from "../utils/api";
import { AuthContext } from "../App";

const Register = () => {
    const [registerState, setRegisterState] = useState("pending");
    const { token } = useContext(AuthContext);
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
            setRegisterState("loading");
            const newUser = await postRegisterUser({
                username: data.username,
                email: data.email,
                password: data.password,
            });
            console.log(newUser);
            setRegisterState("success");
        } catch (error) {
            setRegisterState("error");
            const serverError = error?.response?.data?.data?.errors || [];
            console.log(serverError);
            serverError.map((error) => {
                setError(error.path, { message: error.message });
            });
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center gap-8 items-center bg-pink-600">
            <div>
                <h1 className="text-white text-8xl font-bold font-mono tracking-tighter">
                    bitly
                </h1>
            </div>
            <div className="bg-white min-w-[600px] p-4 rounded">
                {registerState !== "success" && (
                    <>
                        <h2 className="text-2xl mb-4">Register as new user</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label className="block" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="border border-gray-400 rounded p-2 outline-none w-full"
                                type="text"
                                {...register("username", { required: true })}
                            />
                            {errors.username && (
                                <span className="text-pink-600">
                                    {errors.username.message ||
                                        "Username is required"}
                                </span>
                            )}

                            <label className="block" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="border border-gray-400 rounded p-2 outline-none w-full"
                                type="text"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-pink-600">
                                    {errors.email.message ||
                                        "Email is required"}
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
                                <span className="text-pink-600">
                                    {errors.password.message ||
                                        "Password is required"}
                                </span>
                            )}

                            <button
                                disabled={registerState === "loading"}
                                type="submit"
                                className="bg-pink-600 p-2 w-full mt-4 text-white font-bold rounded disabled:bg-gray-400">
                                {registerState === "loading"
                                    ? "Loading..."
                                    : "Register"}
                            </button>
                            <Link
                                to="/login"
                                className="block text-center text-pink-400 mt-2">
                                Login as existing user
                            </Link>
                        </form>
                    </>
                )}

                {registerState === "success" && (
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-pink-600 text-2xl font-bold">
                            Registation Successful
                        </h4>
                        <Link
                            to={"/login"}
                            className="text-xl p-2 mt-4 rounded border text-pink-600 border-pink-600">
                            Login now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
