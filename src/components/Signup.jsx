import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from './index.js'
import { useNavigate } from "react-router-dom";
import authService from "../services/authService.js";



function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');

        try {
            const formData = new FormData();

            if (data?.avatar[0])
                formData.append("avatar", data.avatar[0])

            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("username", data.username)


            const res = await authService.register(formData) //formdatda type:
            if (res) {
                navigate("/login")
            }

        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <form onSubmit={handleSubmit(create)}>

            <div>
                <Input
                    label="Avatar"
                    type='file' {...register("avatar")} />

                <Input
                    label='Email'
                    placeholder='Enter your email'
                    type="email" {...register('email', { required: true })} />

                <Input
                    label='Username'
                    placeholder='Enter your username'
                    type='text' {...register('username', { required: true })} />

                <Input
                    label='Password'
                    placeholder='Enter your password'
                    type='password' {...register('password', { required: true })} />

                <Button type="submit" >
                    Create Account
                </Button>
            </div>

            <div>
                {error && <p className="text-red-600 text center">{error}</p>}
            </div>

        </form>
    )

}


export default Signup;