import { useRef, useState } from "react";
import { Button, Input } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

function EditProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const avatarInputRef = useRef(null);
    const dispatch = useDispatch()

    const updateProfileMutation = useMutation({
        mutationFn: () => userService.updateProfile({ username, email }),
        onSuccess: (res) => {
            dispatch(login(res.data))
            navigate("/profile");
            toast.success("User Details updated successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const updateAvatarMutation = useMutation({
        mutationFn: (data) => userService.updateUserAvatar(data),
        onSuccess: (res) => {
            dispatch(login(res.data))
            navigate('/profile');
            toast.success("Avatar updated successfully")
        },
        onError: (error) => {
            console.log("error is", error)
            toast.error(error.message);
        }
    })

    const currUsername = useSelector((state) => state.auth.userData?.username)
    const userAvatar = useSelector((state) => state.auth.userData?.avatar);
    const isChangingAvatar = updateAvatarMutation.isPending;

    const saveChangeHandler = () => {
        updateProfileMutation.mutate();
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            updateAvatarMutation.mutate(formData);
        }
    }




return (
    <div className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950 md:p-6">
        <div className="mx-auto max-w-3xl">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Edit Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Update your personal information
                </p>
            </div>


            {/* Profile Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 border-b border-slate-200 bg-blue-50 px-6 py-8 dark:border-slate-800 dark:bg-blue-950/20 sm:flex-row">

                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-100 shadow-sm dark:border-slate-700 dark:bg-blue-950/60">

                        {
                            userAvatar ?
                                <img
                                    src={userAvatar}
                                    alt={currUsername}
                                    className="h-full w-full object-cover"
                                />
                                :
                                <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                                    {currUsername?.charAt(0).toUpperCase()}
                                </span>
                        }

                    </div>


                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Profile Picture
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Upload a new profile picture
                        </p>

                        <Button
                            disabled={isChangingAvatar}
                            onClick={() => avatarInputRef.current.click()}
                            className={`mt-3 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
                                isChangingAvatar
                                    ? "border-blue-200 bg-blue-100 text-blue-400 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-500"
                                    : "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-blue-950/40"
                            }`}
                        >
                            {isChangingAvatar ? "Changing..." : "Click here to change Avatar"}
                        </Button>

                        <Input
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

                    <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
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
                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row">

                        <Button
                            onClick={saveChangeHandler}
                            type="button"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        >
                            Save Changes
                        </Button>

                        <Button
                            onClick={() => navigate("/profile")}
                            type="button"
                            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-offset-slate-900"
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
