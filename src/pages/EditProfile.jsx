
import React, { use, useRef, useState } from "react";
import { Button, Input } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js"
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

function EditProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const avatarInputRef = useRef(null);
    const dispatch = useDispatch()

    const saveChangeHandler = async () => {
        try {
            const res = await userService.updateProfile({
                username,
                email
            })

            if (res) {
                dispatch(login(res.data))
                navigate("/profile");
            }

        } catch (error) {
            console.log("UPDATE PROFILE ERROR", error)
        }
    }

    const handleAvatarChange = async (e) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("avatar", file)

                const res = await userService.updateUserAvatar(formData);
                if (res) {
                    dispatch(login(res.data))
                    navigate('/profile');
                }
            }
        } catch (error) {
            console.log('UPDATE AVATAR ERROR' , error)
        }
    }


    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Edit Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4 bg-blue-50 px-6 py-8 sm:flex-row">

                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-200 shadow-sm">
                           { <span className="text-3xl font-bold text-blue-700">
                                A
                            </span>}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Profile Picture
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload a new profile picture
                            </p>

                            <Button
                                type="button"
                                onClick={() => avatarInputRef.current.click()}
                                className="mt-3 rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Change Avatar
                            </Button>

                            <input
                                ref={avatarInputRef}
                                onChange={handleAvatarChange}
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                    </div>

                    {/* Personal Information */}
                    <div className="px-6 py-6">

                        <h3 className="mb-5 text-lg font-semibold text-slate-800">
                            Personal Information
                        </h3>

                        <div className="space-y-5">

                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                label="Username"
                                type="text"
                                placeholder="Enter username"
                            />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                            />

                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                            <Button
                                onClick={saveChangeHandler}
                                type="button"
                                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </Button>

                            <Button
                                onClick={() => navigate("/profile")}
                                type="button"
                                className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                            >
                                Cancel
                            </Button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditProfile;
