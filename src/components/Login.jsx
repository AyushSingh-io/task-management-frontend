import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index.js";
import authService from "../services/authService.js";
import { login } from "../store/authSlice.js";


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const { register, handleSubmit } = useForm();


    const loginHandler = async (data) => {

        setError("");

        try {

            const res = await authService.login(data);

            if (res) {
                dispatch(login(res));
                navigate("/")
            }

        } catch (error) {
            setError(error.message);
        }
    };


    return (

        <div className="min-h-screen bg-slate-100 px-4 py-10">

            <div className="mx-auto w-full max-w-md">

                {/* Header */}
                <div className="mb-6 text-center">

                    <h1 className="text-3xl font-bold text-indigo-700">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Login to your account to continue
                    </p>

                </div>


                {/* Login Card */}
                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className="rounded-xl border border-indigo-100 bg-white p-6 shadow-md"
                >

                    {/* Form Header */}
                    <div className="mb-6 border-b border-indigo-100 pb-4">

                        <h2 className="text-xl font-semibold text-indigo-700">
                            Login
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your credentials below
                        </p>

                    </div>


                    {/* Form Fields */}
                    <div className="space-y-5">

                        {/* Email */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: true })}
                            />

                        </div>


                        {/* Password */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />

                        </div>


                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                                <p className="text-sm font-medium text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}


                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
                        >
                            Login
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );
}


export default Login;