import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData)
    const dipatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Profile
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">

                    {/* Profile Top */}
                    <div className="bg-blue-50 px-6 py-8">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">

                            {/* Avatar */}
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-200 shadow-sm">
                                {userData.avatar ? <img
                                    src={userData.avatar}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                /> : <span className="text-3xl font-bold text-blue-700">
                                    A
                                </span>}
                            </div>

                            {/* Basic Info */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {userData.username}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {userData.email}
                                </p>

                                <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    Active User
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="px-6 py-6">

                        <h3 className="mb-5 text-lg font-semibold text-slate-800">
                            Personal Information
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Username
                                </p>
                                <p className="mt-2 font-medium text-slate-800">
                                    {userData.username}
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Email
                                </p>
                                <p className="mt-2 font-medium text-slate-800">
                                    {userData.email}
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Member Since
                                </p>
                                <p className="mt-2 font-medium text-slate-800">
                                    {userData.createdAt ? new Date(userData.createdAt).toISOString().split('T')[0] : null}
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Account Status
                                </p>
                                <p className="mt-2 font-medium text-blue-600">
                                    Active
                                </p>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                            <button
                                onClick={() => navigate('/profile/edit')}
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Update Profile
                            </button>

                            <button
                                onClick={() => navigate('/profile/change-password')}
                                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Change Password
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;