import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index.js";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService.js";


function Signup() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();


    const create = async (data) => {

        setError("");

        try {

            const formData = new FormData();

            if (data?.avatar[0])
                formData.append("avatar", data.avatar[0]);

            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("username", data.username);


            const res = await authService.register(formData);

            if (res) {
                navigate("/login");
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
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign up to start managing your projects and tasks
                    </p>

                </div>


                {/* Signup Card */}
                <form
                    onSubmit={handleSubmit(create)}
                    className="rounded-xl border border-indigo-100 bg-white p-6 shadow-md"
                >

                    {/* Form Header */}
                    <div className="mb-6 border-b border-indigo-100 pb-4">

                        <h2 className="text-xl font-semibold text-indigo-700">
                            Sign Up
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your details below
                        </p>

                    </div>


                    {/* Form Fields */}
                    <div className="space-y-5">

                        {/* Avatar */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Avatar"
                                type="file"
                                {...register("avatar")}
                            />

                        </div>


                        {/* Email */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", { required: true })}
                            />

                        </div>


                        {/* Username */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Username"
                                placeholder="Enter your username"
                                type="text"
                                {...register("username", { required: true })}
                            />

                        </div>


                        {/* Password */}
                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
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


                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
                        >
                            Create Account
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default Signup;