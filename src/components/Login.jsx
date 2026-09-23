
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "./index.js";
import authService from "../services/authService.js";
import { login } from "../store/authSlice.js";
import { toast } from "sonner";

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
                console.log(res, res.data);
                dispatch(login(res.data));
                navigate("/");
                toast.success("Logged in successfully");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
            <div className="mx-auto w-full max-w-md">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Login to your account to continue
                    </p>
                </div>

                {/* Login Card */}
                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900"
                >

                    {/* Form Header */}
                    <div className="border-b border-indigo-100 bg-indigo-50 px-6 py-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
                        <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
                            Login
                        </h2>

                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Enter your credentials below
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-5 p-6">

                        {/* Email */}
                        <div>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                
                                {...register("email", { required: true })}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/60 dark:bg-red-950/30">
                                <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                        >
                            Login
                        </Button>

                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login;
