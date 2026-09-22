import React, { useState } from "react";
import { Button, Input } from "../components/index.js";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const changePasswordMutation = useMutation({
        mutationFn: (data) => userService.changePassword(data),
        onSuccess: () => {
            navigate("/profile");
            toast.success("Updated Password successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const isChangingPassword = changePasswordMutation.isPending;

    const changePasswordHandler = () => {
        if (!newPassword || !currentPassword || !confirmPassword) {
            toast.info("Password cannot be empty");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.info("Confirm the password")
            return;
        }

        changePasswordMutation.mutate({ oldPassword: currentPassword, newPassword })
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
                                disabled={isChangingPassword}
                                onClick={changePasswordHandler}
                                type="button"
                                className={`rounded-lg  px-5 py-2.5 text-sm font-semibold text-white  ${isChangingPassword ? "bg-blue-900" : "bg-blue-600 transition hover:bg-blue-700"}`}
                            >
                                {isChangingPassword ? "Updating..." : "Update Password"}
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