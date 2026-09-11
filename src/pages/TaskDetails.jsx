import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService.js";
import commentService from '../services/commentService.js'
import projectMemberService from '../services/projectMemberService.js'
import { Select, Button, Loading, ErrorMessage } from "../components/index.js"


function TaskDetails() {
    const { projectId, taskId } = useParams();
    const [task, setTask] = useState();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [inputComment, setInputComment] = useState("");
    const [showAssignMembers, setShowAssignMembers] = useState(false);
    const [projectMembers, setProjectMembers] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [error, setError] = useState(null)


    const dateConverter = (d) => {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        return formattedDate;
    }

    const updateHandler = async () => {
        navigate(`/projects/${projectId}/tasks/${taskId}/edit`)
    }

    const deleteHandler = async () => {
        setIsDeleting(true)
        try {
            const res = await taskService.deleteTaskById(taskId);
            if (res) {
                navigate(`/projects/${projectId}`);
            }
        } catch (error) {
            console.log('DELETE TASK ERROR ', error)
        }
        setIsDeleting(false)
    }

    const addCommentHandler = async () => {
        if (!inputComment.trim()) {
            return;
        }

        setIsAddingComment(true)
        try {
            const res = await commentService.addCommentToTask(taskId, { content: inputComment });
            if (res) {
                console.log(res)
                setComments((prev) => [res.data, ...prev]);
                setInputComment("");
            }
        } catch (error) {
            console.log("ADD COMMENT ERROR", error)
        }
        setIsAddingComment(false)

    }

    const assignTaskHandler = async (member) => {
        //TODO : update assignTask controller to populate task

        if (task.assignedTo === member.member._id) {
            setShowAssignMembers(false);
            console.log("Already assigned member")
            return;
        }

        try {
            const res = await taskService.assignTask(taskId, { assignedTo: member.member._id });
            if (res) {
                console.log(res, res.data)
                setTask(res.data)
                setShowAssignMembers(false)
            }
        } catch (error) {
            console.log("ASSIGN TASK ERROR", error)
        }
    }

    const updateStatusHandler = async () => {
        setUpdatingStatus(true)
        try {
            const res = await taskService.updateTaskStatus(taskId, { status: selectedStatus });
            console.log("responsee is ", res)
            if (res) {
                setTask((prev) => ({ ...prev, status: res.data.status }))
                setUpdatingStatus(false)
            }

        } catch (error) {
            console.log('UPDATE STATUS ERROR', error)
        }
    }

    const fetchTaskDetails = async () => {
        try {
            setError("")
            const [taskRes, commentRes, projectMembersRes] = await Promise.all([
                taskService.getTaskById(taskId),
                commentService.getAllComments(taskId),
                projectMemberService.getAllProjectMembers(projectId),
            ]);

            if (taskRes) {
                setTask(taskRes.data);
                setSelectedStatus(taskRes.data.status)
            }
            if (commentRes) {
                setComments(commentRes.data)
            }
            if (projectMembersRes) {
                setProjectMembers(projectMembersRes.data)
            }



        } catch (error) {
            console.log("TASK DETAILS ERROR,", error);
            setError(error.message)
            // navigate(`/projects/${projectId}`);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchTaskDetails();

    }, [taskId, projectId])

    return (
        error ?
            <ErrorMessage message={error} onRetry={fetchTaskDetails} />
            :
            <div className="min-h-screen bg-slate-100 p-4 md:p-6">

                <div className="mx-auto max-w-7xl">

                    {/* Main 60 / 40 Layout */}
                    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">

                        {/* ================= TASK DETAILS ================= */}
                        <div className="flex lg:col-span-3">

                            <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-md">

                                {/* Header */}
                                <div className="shrink-0 border-b border-emerald-100 bg-emerald-100/70 px-6 py-5">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-emerald-600">
                                                Task Details
                                            </p>

                                            <h1 className="mt-1 text-2xl font-bold text-emerald-800">
                                                {task?.name}
                                            </h1>
                                        </div>


                                        {/* Actions */}
                                        <div className="flex gap-2">

                                            <Button
                                                onClick={() => setShowAssignMembers(true)}
                                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                            >
                                                {task?.assignedTo ? "Change Assignee" : "Assign Task"}
                                            </Button>

                                            <Button
                                                onClick={updateHandler}
                                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                                            >
                                                Update
                                            </Button>

                                            <Button
                                                disabled={isDeleting}
                                                onClick={deleteHandler}
                                                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm  ${isDeleting ? "bg-red-900" : "bg-red-600 transition hover:bg-red-700"}`}
                                            >
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </Button>

                                        </div>

                                    </div>

                                </div>


                                {/* Task Information */}
                                {
                                    isLoading ? <Loading />
                                        :
                                        <div className="flex-1 space-y-5 p-6">

                                            {/* Description */}
                                            <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                    Description
                                                </h2>

                                                <p className="mt-3 leading-7 text-slate-700">
                                                    {task?.description}
                                                </p>

                                            </div>


                                            {/* Status / Priority */}
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                                {/* Status */}
                                                <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                        Status
                                                    </h2>

                                                    <div className="mt-3 flex flex-col gap-3">

                                                        <Select
                                                            value={selectedStatus}
                                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                                            options={["TODO", "IN_PROGRESS", "DONE"]}
                                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                                        >
                                                        </Select>

                                                        <Button
                                                            onClick={updateStatusHandler}
                                                            disabled={
                                                                updatingStatus ||
                                                                selectedStatus === task?.status
                                                            }
                                                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {updatingStatus ? "Updating..." : "Update Status"}
                                                        </Button>

                                                    </div>

                                                </div>


                                                {/* Priority */}
                                                <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                        Priority
                                                    </h2>

                                                    <span className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                                                        {task?.priority}
                                                    </span>

                                                </div>

                                            </div>


                                            {/* Assigned To */}
                                            <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                    Assigned To
                                                </h2>

                                                <div className="mt-3 flex items-center gap-3">

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 overflow-hidden">
                                                        {
                                                            task?.assignedTo?.avatar ?
                                                                <img
                                                                    src={task.assignedTo.avatar}
                                                                    alt={task.assignedTo.username}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                :
                                                                task?.assignedTo?.username
                                                                    ?.charAt(0)
                                                                    .toUpperCase() || "?"
                                                        }
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-slate-800">
                                                            {task?.assignedTo?.username || task?.assignedTo || "Not Assigned"}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Dates */}
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                                {/* Due Date */}
                                                <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                        Due Date
                                                    </h2>

                                                    <p className="mt-3 font-semibold text-slate-800">
                                                        {task?.dueDate ? dateConverter(task.dueDate) : "__"}
                                                    </p>

                                                </div>


                                                {/* Completed At */}
                                                <div className="rounded-lg border border-emerald-100 bg-white p-5">

                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                        Completed At
                                                    </h2>

                                                    <p className="mt-3 font-semibold text-slate-800">
                                                        {task?.completedAt ? dateConverter(task.completedAt) : "__"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>}

                            </div>

                        </div>


                        {/* ================= COMMENTS ================= */}
                        <div className="flex lg:col-span-2">

                            <div className="flex h-full max-h-[calc(100vh-3rem)] min-h-[600px] w-full flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-md">

                                {/* Comments Header */}
                                <div className="shrink-0 border-b border-emerald-100 bg-emerald-100/70 px-5 py-5">

                                    <h2 className="text-xl font-semibold text-emerald-800">
                                        Comments
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-600">
                                        Discuss this task with project members.
                                    </p>

                                </div>


                                {/* Add Comment */}
                                <div className="shrink-0 border-b border-emerald-100 bg-white p-5">

                                    <textarea
                                        value={inputComment}
                                        onChange={(e) => setInputComment(e.target.value)}
                                        rows="3"
                                        placeholder="Write a comment..."
                                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                    <div className="mt-3 flex justify-end">

                                        <Button
                                            disabled={isAddingComment}
                                            onClick={addCommentHandler}
                                            className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white ${isAddingComment ? "bg-emerald-900" : "bg-emerald-600 transition hover:bg-emerald-700"}`}
                                        >
                                            {isAddingComment ? "Adding..." : "Add Comment"}
                                        </Button>

                                    </div>

                                </div>


                                {/* Comments List */}
                                {isLoading ? <Loading /> : <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">

                                    {/* Comment 1 */}
                                    {
                                        comments ?
                                            comments.map((comment) => (
                                                <div key={comment._id} className="rounded-lg border border-emerald-100 bg-white p-4">

                                                    <div className="flex items-start gap-3">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 overflow-hidden">
                                                            {comment?.owner.avatar ?
                                                                <img src={comment.owner.avatar} alt="avatar"
                                                                    className="h-full w-full object-cover" />
                                                                :
                                                                comment.owner.username
                                                                    ?.charAt(0)
                                                                    .toUpperCase()
                                                            }
                                                        </div>

                                                        <div className="min-w-0 flex-1">

                                                            <div className="flex items-start justify-between gap-3">

                                                                <div>
                                                                    <p className="font-semibold text-slate-800">
                                                                        {comment?.owner.username}
                                                                    </p>
                                                                </div>

                                                                <p className="shrink-0 text-xs text-slate-400">
                                                                    {comment.createdAt ? new Date(comment.createdAt).toISOString().split('T')[0] : null}
                                                                </p>

                                                            </div>

                                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                                {comment?.content}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            ))
                                            : <p>no comments</p>
                                    }

                                </div>}

                            </div>

                        </div>

                        {/*============== PROJECT MEMBER LIST ======= */}
                        {showAssignMembers && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                                <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                                    {/* Header */}
                                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                                        <div>
                                            <h2 className="text-xl font-semibold text-indigo-700">
                                                Assign Task
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Select a project member to assign this task.
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => setShowAssignMembers(false)}
                                            className="rounded-md px-3 py-1 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            ×
                                        </Button>

                                    </div>


                                    {/* Members */}
                                    <div className="max-h-[400px] space-y-3 overflow-y-auto p-6">

                                        {/* Example member */}
                                        {
                                            projectMembers.map((member) => (

                                                <div
                                                    key={member._id}
                                                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                                                            {member.member.avatar ?

                                                                <img
                                                                    src={member.member.avatar}
                                                                    alt="avatar"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                :
                                                                member.member.username?.charAt(0).toUpperCase()
                                                            }
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {member.member.username}
                                                            </p>

                                                            <p className="text-sm text-slate-500">
                                                                {member.member.role}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <Button
                                                        onClick={() => assignTaskHandler(member)}
                                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                                    >
                                                        Assign
                                                    </Button>

                                                </div>
                                            ))
                                        }

                                    </div>


                                    {/* Footer */}
                                    <div className="flex justify-end border-t border-slate-200 px-6 py-4">

                                        <Button
                                            onClick={() => setShowAssignMembers(false)}
                                            className="rounded-lg bg-slate-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                                        >
                                            Cancel
                                        </Button>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>
    );
}

export default TaskDetails;