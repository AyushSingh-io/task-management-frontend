import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService.js";
import commentService from "../services/commentService.js";
import projectMemberService from "../services/projectMemberService.js";
import { Select, Button, Loading, ErrorMessage } from "../components/index.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

function TaskDetails() {
    const { projectId, taskId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [inputComment, setInputComment] = useState("");
    const [showAssignMembers, setShowAssignMembers] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");

    // Queries


    const taskQuery = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => taskService.getTaskById(taskId),
    });

    const commentQuery = useQuery({
        queryKey: ["taskComments", taskId],
        queryFn: () => commentService.getAllComments(taskId),
    });

    const projectMembersQuery = useQuery({
        queryKey: ["projectMembers", projectId],
        queryFn: () =>
            projectMemberService.getAllProjectMembers(projectId),
    });

    const task = taskQuery.data?.data;
    const comments = commentQuery.data?.data || [];
    const projectMembers = projectMembersQuery.data?.data || [];

    useEffect(() => {
        setSelectedStatus(task?.status || "");
    }, [task]);

    const isLoading =
        taskQuery.isLoading ||
        commentQuery.isLoading ||
        projectMembersQuery.isLoading;

    const isError =
        taskQuery.isError ||
        commentQuery.isError ||
        projectMembersQuery.isError;

    const error =
        taskQuery.error ||
        commentQuery.error ||
        projectMembersQuery.error;


    // Mutations


    const assignTaskMutation = useMutation({
        mutationFn: (member) =>
            taskService.assignTask(taskId, {
                assignedTo: member.member._id,
            }),

        onSuccess: () => {
            setShowAssignMembers(false);

            toast.success("Task assigned successfully");

            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });

            queryClient.invalidateQueries({
                queryKey: ["projectTasks", projectId],
            });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: () => taskService.deleteTaskById(taskId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projectTasks", projectId],
            });

            navigate(`/projects/${projectId}`);

            toast.success("Task deleted successfully");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const addCommentMutation = useMutation({
        mutationFn: (content) =>
            commentService.addCommentToTask(taskId, {
                content,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["taskComments", taskId],
            });

            setInputComment("");

            toast.success("Comment added successfully");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: () =>
            taskService.updateTaskStatus(taskId, {
                status: selectedStatus,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });

            queryClient.invalidateQueries({
                queryKey: ["projectTasks", projectId],
            });

            toast.success(
                `Task status updated to ${selectedStatus}`
            );
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const dateConverter = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const currUser = useSelector(
        (state) => state.auth.userData
    );

    const currUserRoleInProject = projectMembers.find(
        (obj) => obj.member._id === currUser?._id
    )?.role;

    const isDeleting = deleteTaskMutation.isPending;
    const isAddingComment = addCommentMutation.isPending;
    const updatingStatus = updateStatusMutation.isPending;

    const canManageTask = ["OWNER", "ADMIN"].includes(
        currUserRoleInProject
    );

    const canUpdateStatus =
        canManageTask ||
        currUser?._id === task?.assignedTo?._id;



    const updateHandler = () => {
        navigate(
            `/projects/${projectId}/tasks/${taskId}/edit`
        );
    };

    const deleteHandler = () => {
        deleteTaskMutation.mutate();
    };

    const addCommentHandler = () => {
        const comment = inputComment.trim();

        if (!comment) {
            return;
        }

        addCommentMutation.mutate(comment);
    };

    const assignTaskHandler = (member) => {
        if (task?.assignedTo?._id === member.member._id) {
            setShowAssignMembers(false);
            return;
        }

        assignTaskMutation.mutate(member);
    };

    const updateStatusHandler = () => {
        updateStatusMutation.mutate();
    };



    if (isError) {
        return (
            <ErrorMessage
                message={error}
                onRetry={() => {
                    taskQuery.refetch();
                    commentQuery.refetch();
                    projectMembersQuery.refetch();
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* =========================
                Page Header
            ========================= */}

                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(`/projects/${projectId}`)}
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-green-700 transition hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>

                        Back to Project
                    </button>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                            Task Details
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                            {task?.name}
                        </h1>
                    </div>
                </div>

                {/* =========================
                Main Layout
            ========================= */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

                    {/* =========================
                    Task Details
                ========================= */}

                    <div className="lg:col-span-3">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                            {/* Task Header */}

                            <div className="border-b border-green-100 bg-green-50 px-5 py-5 dark:border-green-900/40 dark:bg-green-950/30 sm:px-6">

                                <div className="flex flex-col gap-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400" />

                                            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                                Task Information
                                            </span>
                                        </div>

                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                                            {task?.status}
                                        </span>

                                    </div>

                                    {/* Actions */}

                                    {canManageTask && (
                                        <div className="flex flex-wrap gap-2">

                                            <Button
                                                onClick={() => setShowAssignMembers(true)}
                                                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:px-4 sm:text-sm"
                                            >
                                                {task?.assignedTo
                                                    ? "Change Assignee"
                                                    : "Assign Task"}
                                            </Button>

                                            <Button
                                                onClick={updateHandler}
                                                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:px-4 sm:text-sm"
                                            >
                                                Update
                                            </Button>

                                            <Button
                                                disabled={isDeleting}
                                                onClick={deleteHandler}
                                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
                                            >
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </Button>

                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Task Content */}

                            {isLoading ? (
                                <div className="flex min-h-[500px] items-center justify-center">
                                    <Loading />
                                </div>
                            ) : (
                                <div className="space-y-5 p-5 sm:p-6">

                                    {/* Description */}

                                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            Description
                                        </h2>

                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                                            {task?.description ||
                                                "No description available."}
                                        </p>
                                    </div>

                                    {/* Status + Priority */}

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        {/* Status */}

                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">

                                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Status
                                            </h2>

                                            {canUpdateStatus ? (
                                                <div className="mt-3 space-y-3">

                                                    <Select
                                                        value={selectedStatus}
                                                        onChange={(e) =>
                                                            setSelectedStatus(
                                                                e.target.value
                                                            )
                                                        }
                                                        options={[
                                                            "TODO",
                                                            "IN_PROGRESS",
                                                            "DONE",
                                                        ]}
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-green-400 dark:focus:ring-green-900/40"
                                                    />

                                                    <Button
                                                        onClick={updateStatusHandler}
                                                        disabled={
                                                            updatingStatus ||
                                                            selectedStatus ===
                                                            task?.status
                                                        }
                                                        className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {updatingStatus
                                                            ? "Updating..."
                                                            : "Update Status"}
                                                    </Button>

                                                </div>
                                            ) : (
                                                <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-400">
                                                    {task?.status}
                                                </span>
                                            )}

                                        </div>

                                        {/* Priority */}

                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">

                                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Priority
                                            </h2>

                                            <span
                                                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${task?.priority === "HIGH"
                                                        ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                                                        : task?.priority === "MEDIUM"
                                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                                                            : "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400"
                                                    }`}
                                            >
                                                {task?.priority}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Assigned To */}

                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">

                                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            Assigned To
                                        </h2>

                                        <div className="mt-3 flex items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-400">

                                                {task?.assignedTo?.avatar ? (
                                                    <img
                                                        src={task.assignedTo.avatar}
                                                        alt={task.assignedTo.username}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    task?.assignedTo?.username
                                                        ?.charAt(0)
                                                        .toUpperCase() || "?"
                                                )}

                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                                                    {task?.assignedTo?.username ||
                                                        task?.assignedTo ||
                                                        "Not Assigned"}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                                    Current assignee
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    {/* Dates */}

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">

                                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Due Date
                                            </h2>

                                            <p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">
                                                {task?.dueDate
                                                    ? dateConverter(task.dueDate)
                                                    : "No due date"}
                                            </p>

                                        </div>

                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">

                                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                Completed At
                                            </h2>

                                            <p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">
                                                {task?.completedAt
                                                    ? dateConverter(task.completedAt)
                                                    : "Not completed"}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>
                    </div>

                    {/* =========================
                    Comments
                ========================= */}

                    <div className="lg:col-span-2">

                        <div className="flex h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:h-[calc(100vh-8rem)] lg:min-h-[600px]">

                            {/* Header */}

                            <div className="shrink-0 border-b border-green-100 bg-green-50 px-5 py-5 dark:border-green-900/40 dark:bg-green-950/30">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950/60">
                                        <svg
                                            className="h-5 w-5 text-green-700 dark:text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 10h8M8 14h5m7-2a8 8 0 11-16 0 8 8 0 0016 0z"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900 dark:text-white">
                                            Comments
                                        </h2>

                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Discuss this task with project members.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Add Comment */}

                            <div className="shrink-0 border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">

                                <textarea
                                    value={inputComment}
                                    onChange={(e) =>
                                        setInputComment(e.target.value)
                                    }
                                    rows="3"
                                    placeholder="Write a comment..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-green-400 dark:focus:bg-slate-800 dark:focus:ring-green-900/40"
                                />

                                <div className="mt-3 flex justify-end">

                                    <Button
                                        disabled={
                                            isAddingComment ||
                                            !inputComment.trim()
                                        }
                                        onClick={addCommentHandler}
                                        className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isAddingComment
                                            ? "Adding..."
                                            : "Add Comment"}
                                    </Button>

                                </div>

                            </div>

                            {/* Comments List */}

                            {isLoading ? (
                                <div className="flex flex-1 items-center justify-center">
                                    <Loading />
                                </div>
                            ) : (
                                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/60 p-4 dark:bg-slate-950/40 sm:p-5">

                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div
                                                key={comment._id}
                                                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                            >

                                                <div className="flex items-start gap-3">

                                                    {/* Avatar */}

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-400">

                                                        {comment?.owner?.avatar ? (
                                                            <img
                                                                src={comment.owner.avatar}
                                                                alt={comment.owner.username}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            comment?.owner?.username
                                                                ?.charAt(0)
                                                                .toUpperCase()
                                                        )}

                                                    </div>

                                                    {/* Content */}

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                                            <p className="font-semibold text-slate-800 dark:text-slate-100">
                                                                {comment?.owner?.username}
                                                            </p>

                                                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                                                {comment.createdAt
                                                                    ? dateConverter(
                                                                        comment.createdAt
                                                                    )
                                                                    : ""}
                                                            </p>

                                                        </div>

                                                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                                            {comment?.content}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center text-center">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/60">
                                                <svg
                                                    className="h-6 w-6 text-green-600 dark:text-green-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 10h8M8 14h5m7-2a8 8 0 11-16 0 8 8 0 0016 0z"
                                                    />
                                                </svg>
                                            </div>

                                            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                No comments yet
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                                Start the conversation.
                                            </p>

                                        </div>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>

                </div>

                {/* =========================
                Assign Member Modal
            ========================= */}

                {showAssignMembers && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

                        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

                            {/* Modal Header */}

                            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Assign Task
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Select a project member to assign this task.
                                    </p>
                                </div>

                                <Button
                                    onClick={() => setShowAssignMembers(false)}
                                    className="rounded-lg p-2 text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                >
                                    ×
                                </Button>

                            </div>

                            {/* Members */}

                            <div className="max-h-[60vh] space-y-2 overflow-y-auto p-4 sm:p-6">

                                {projectMembers.map((member) => (
                                    <div
                                        key={member._id}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-green-200 hover:bg-green-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-green-800 dark:hover:bg-green-950/30"
                                    >

                                        <div className="flex min-w-0 items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-700 dark:bg-green-950/60 dark:text-green-400">

                                                {member.member.avatar ? (
                                                    <img
                                                        src={member.member.avatar}
                                                        alt={member.member.username}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    member.member.username
                                                        ?.charAt(0)
                                                        .toUpperCase()
                                                )}

                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                                                    {member.member.username}
                                                </p>

                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {member.member.role}
                                                </p>
                                            </div>

                                        </div>

                                        <Button
                                            disabled={assignTaskMutation.isPending}
                                            onClick={() =>
                                                assignTaskHandler(member)
                                            }
                                            className="shrink-0 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                                        >
                                            {assignTaskMutation.isPending
                                                ? "..."
                                                : "Assign"}
                                        </Button>

                                    </div>
                                ))}

                            </div>

                            {/* Footer */}

                            <div className="flex justify-end border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">

                                <Button
                                    onClick={() => setShowAssignMembers(false)}
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </Button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );

}

export default TaskDetails;