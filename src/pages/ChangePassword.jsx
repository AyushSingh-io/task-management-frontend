import React, { useState } from "react";
import { Button, Input } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const ChangePasswordHandler = async () => {
        try {
            if (newPassword !== confirmPassword) return true;
            const res = await userService.changePassword({
                oldPassword: currentPassword,
                newPassword
            })

            if (res) {
                navigate("/profile")
            }

        } catch (error) {
            console.log("CHANGE PASSWORD ERROR", error)
        }


    }

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Change Password
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Keep your account secure by updating your password
                    </p>
                </div>

                {/* Password Card */}
                <div className="rounded-xl border border-blue-100 bg-white shadow-sm">

                    {/* Header */}
                    <div className="bg-blue-50 px-6 py-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Password & Security
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your current password and choose a new one.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-6 py-6">

                        <div className="space-y-5">

                            <Input
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                label="Current Password"
                                type="password"
                                placeholder="Enter current password"
                            />

                            <Input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                label="New Password"
                                type="password"
                                placeholder="Enter new password"
                            />

                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                label="Confirm New Password"
                                type="password"
                                placeholder="Confirm new password"
                            />

                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                            <Button
                                onClick={ChangePasswordHandler}
                                type="button"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Update Password
                            </Button>

                            <Button
                                onClick={() => navigate("/profile")}
                                type="button"
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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

export default ChangePassword;