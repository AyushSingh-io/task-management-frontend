
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectMemberService from "../services/projectMemberService.js";
import { Button, ErrorMessage, Input, Loading, Select } from "../components/index.js";
import userService from "../services/userService.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


function ProjectMembers() {

    const { projectId } = useParams();
    const queryClient = useQueryClient();

    const [selectedMember, setSelectedMember] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [inputUsername, setInputUsername] = useState("");
    const [newRoleOfSelectedMember, setNewRoleOfSelectedMember] = useState()

    //queries :
    const projectMembersQuery = useQuery({
        queryKey: ["projectMembers", projectId],
        queryFn: () => projectMemberService.getAllProjectMembers(projectId)
    })

    const members = projectMembersQuery.data?.data || [];
    const isLoading = projectMembersQuery.isLoading;
    const isError = projectMembersQuery.isError;
    const error = projectMembersQuery.error || "";


    //mutations:
    const addProjectMemberMutation = useMutation({
        mutationFn: async () => {
            const res = await userService.getUserInfo({ username: inputUsername });
            const newMemberId = res?.data?._id;

            const r = await projectMemberService.addProjectMember(projectId, newMemberId);
            return r;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projectMembers", projectId]
            });
            setInputUsername("");
            setShowAddMember(false);
            toast.success("Member added successfully");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const changeRoleMutation = useMutation({
        mutationFn: () => projectMemberService.changeProjectMemberRole(projectId, selectedMember.member._id, { role: newRoleOfSelectedMember }),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["projectMembers", projectId]
            });
            console.log("change roel muttioan res", res)
            setSelectedMember((prev) => ({ ...prev, role: res.data.role }))
            if (newRoleOfSelectedMember === "OWNER") {
                toast.success("Ownership transfered successfully")
            } else {
                toast.success("Role change successfully");
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const removeMemberMutation = useMutation({
        mutationFn: () => projectMemberService.removeProjectMember(projectId, selectedMember.member._id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projectMembers", projectId]
            });
            setSelectedMember(null);
            toast.success("Member removed successfully")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const addProjectMemberHandler = () => {
        addProjectMemberMutation.mutate();
    }

    const changeRoleHandler = async () => {
        if (!newRoleOfSelectedMember || newRoleOfSelectedMember === selectedMember.role) {
            toast.info("Member have this role already")
            return null;
        }

        changeRoleMutation.mutate();
    }

    const removeMemberHandler = async () => {
        removeMemberMutation.mutate();
    }

    const isAddingMember = addProjectMemberMutation.isPending
    const isChangingRole = changeRoleMutation.isPending
    const isRemovingMember = removeMemberMutation.isPending

    const currUser = useSelector((state) => state.auth.userData);
    const currUserRoleInProject = members.find((obj) => obj.member._id === currUser?._id)?.role



    return (
        isError ? (
            <ErrorMessage
                message={error}
                onRetry={() => projectMembersQuery.refetch()}
            />
        ) : (
            <div className="min-h-screen bg-slate-100 p-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                        Project Members
                    </h1>

                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                        View and manage members involved in this project.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Members List */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">

                        {/* Header */}
                        <div className="mb-4 flex flex-col gap-3 border-b border-indigo-100 pb-3 dark:border-indigo-900/50 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
                                    Members
                                </h2>

                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    People working on this project
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                    {members.length} Members
                                </span>

                                {["OWNER", "ADMIN"].includes(
                                    currUserRoleInProject
                                ) && (
                                        <Button
                                            onClick={() => setShowAddMember(true)}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                        >
                                            + Add Member
                                        </Button>
                                    )}

                            </div>
                        </div>

                        {/* Add Member Section */}
                        {showAddMember && (
                            <div className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">

                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                                        Add New Member
                                    </h3>

                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Enter the username of the user you want to add.
                                    </p>
                                </div>

                                {/* Username Input */}
                                <div className="mb-4">
                                    <Input
                                        value={inputUsername}
                                        onChange={(e) =>
                                            setInputUsername(e.target.value)
                                        }
                                        label="Username"
                                        placeholder="Enter username"
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-2">

                                    <Button
                                        onClick={() => setShowAddMember(false)}
                                        className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        disabled={isAddingMember}
                                        onClick={addProjectMemberHandler}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${isAddingMember
                                            ? "bg-indigo-900 dark:bg-indigo-950"
                                            : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                            }`}
                                    >
                                        {isAddingMember
                                            ? "Adding..."
                                            : "Add Member"}
                                    </Button>

                                </div>

                            </div>
                        )}

                        {/* Members */}
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="max-h-[480px] space-y-3 overflow-y-auto pr-2">

                                {members.map((member) => (

                                    <div
                                        key={member._id}
                                        onClick={() => {
                                            setSelectedMember(member);
                                            setNewRoleOfSelectedMember(member.role);
                                        }}
                                        className={`cursor-pointer rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${selectedMember?._id === member._id
                                            ? "border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/40"
                                            : "border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30"
                                            }`}
                                    >

                                        <div className="flex items-center justify-between gap-4">

                                            {/* User Info */}
                                            <div className="flex min-w-0 items-center gap-3">

                                                {/* Avatar */}
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 font-semibold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">

                                                    {member.member.avatar ? (
                                                        <img
                                                            src={member.member.avatar}
                                                            alt="avatar"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        member.member.username
                                                            ?.charAt(0)
                                                            .toUpperCase()
                                                    )}

                                                </div>

                                                <div className="min-w-0">

                                                    <h3 className="truncate font-semibold text-slate-800 dark:text-slate-100">
                                                        {member.member.username}
                                                    </h3>

                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        Project Member
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Role */}
                                            <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                                {member.role}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        )}

                    </div>

                    {/* Selected Member Details */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

                        {selectedMember ? (

                            <>

                                {/* Card Header */}
                                <div className="mb-5 border-b border-indigo-100 pb-4 dark:border-indigo-900/50">

                                    <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
                                        Member Details
                                    </h2>

                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Details of the selected project member
                                    </p>

                                </div>

                                {/* Avatar */}
                                <div className="mb-5 flex flex-col items-center">

                                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">

                                        {selectedMember.member.avatar ? (
                                            <img
                                                src={selectedMember.member.avatar}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            selectedMember.member.username
                                                ?.charAt(0)
                                                .toUpperCase()
                                        )}

                                    </div>

                                    <h3 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
                                        {selectedMember.member.username}
                                    </h3>

                                </div>

                                {/* Details */}
                                <div className="space-y-4">

                                    {/* Username */}
                                    <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">

                                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                            Username
                                        </p>

                                        <p className="mt-1 font-semibold text-indigo-900 dark:text-indigo-200">
                                            {selectedMember.member.username}
                                        </p>

                                    </div>

                                    {/* Role */}
                                    <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">

                                        <p className="mb-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                            Project Role
                                        </p>

                                        <p className="mb-3 font-semibold text-indigo-900 dark:text-indigo-200">
                                            {selectedMember.role}
                                        </p>

                                        {["OWNER", "ADMIN"].includes(
                                            currUserRoleInProject
                                        ) && (
                                                <Select
                                                    value={newRoleOfSelectedMember}
                                                    onChange={(e) =>
                                                        setNewRoleOfSelectedMember(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Change Role To :"
                                                    options={[
                                                        "OWNER",
                                                        "ADMIN",
                                                        "MEMBER",
                                                    ]}
                                                    className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                                />
                                            )}

                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex flex-col gap-3">

                                    {["OWNER", "ADMIN"].includes(
                                        currUserRoleInProject
                                    ) && (
                                            <>
                                                <Button
                                                    disabled={isChangingRole}
                                                    onClick={changeRoleHandler}
                                                    className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${isChangingRole
                                                        ? "bg-indigo-900 dark:bg-indigo-950"
                                                        : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                                        }`}
                                                >
                                                    {isChangingRole
                                                        ? "Changing..."
                                                        : "Change Role"}
                                                </Button>

                                                <Button
                                                    disabled={isRemovingMember}
                                                    onClick={removeMemberHandler}
                                                    className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${isRemovingMember
                                                        ? "bg-red-900 dark:bg-red-950"
                                                        : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                                        }`}
                                                >
                                                    {isRemovingMember
                                                        ? "Removing..."
                                                        : "Remove Member"}
                                                </Button>
                                            </>
                                        )}

                                </div>

                            </>

                        ) : (

                            /* No Member Selected */
                            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-slate-800">
                                    👤
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
                                    No Member Selected
                                </h3>

                                <p className="mt-1 max-w-xs text-sm text-slate-600 dark:text-slate-400">
                                    Click on a project member from the list to view
                                    their details.
                                </p>

                            </div>

                        )}

                    </div>

                </div>
            </div>
        )
    );


}


export default ProjectMembers;
