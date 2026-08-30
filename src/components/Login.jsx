import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from './index.js'
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
                navigate("/dashboard");
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(loginHandler)}>

            <div>
                <Input
                    label="Email:"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: true })}
                />

                <Input
                    label="Password :"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', { required: true })}
                />

                <Button type="submit">
                    Login
                </Button>
            </div>

            <div>
                {error && <p className="text-red-600 text-center">{error}</p>}
            </div>

        </form>
    )

}


export default Login;