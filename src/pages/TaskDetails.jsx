import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService.js";
import commentService from '../services/commentService.js'


function TaskDetails() {
    const { projectId, taskId } = useParams();
    const [task, setTask] = useState();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [inputComment, setInputComment] = useState("");

    const dateConverter = (d) => {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        console.log(task, comments)
        return formattedDate;
    }

    const updateHandler = async () => {
        navigate(`/projects/${projectId}/tasks/${taskId}/edit`)
    }

    const deleteHandler = async () => {
        const res = await taskService.deleteTaskById(taskId);
        if (res) {
            navigate(`/projects/${projectId}`);
        }
    }

    const addCommentHandler = async () => {
        const res = await commentService.addCommentToTask(taskId, { content: inputComment });
        if (res) {
            setComments((prev) => [res.data ,...prev]);
            setInputComment("");
        }

    }

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const [taskRes, commentRes] = await Promise.all([
                    taskService.getTaskById(taskId),
                    commentService.getAllComments(taskId)
                ]);

                if (taskRes) {
                    setTask(taskRes.data);
                }
                if (commentRes) {
                    setComments(commentRes.data)
                }

                console.log(task, comments)

            } catch (error) {
                console.log("TASK DETAILS ERROR,", error);
                // navigate(`/projects/${projectId}`);
            }
        }

        fetchTaskDetails();

    }, [taskId])

    return (
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

                                        <button
                                            onClick={updateHandler}
                                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={deleteHandler}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>


                            {/* Task Information */}
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

                                        <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                                            {task?.status}
                                        </span>

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

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                                            AS
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {task?.assignedTo || "assignedToUserName"}
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

                            </div>

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

                                    <button
                                        onClick={addCommentHandler}
                                        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        Add Comment
                                    </button>

                                </div>

                            </div>


                            {/* Comments List */}
                            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">

                                {/* Comment 1 */}
                                {
                                    comments ?
                                        comments.map((comment) => (
                                            <div key={comment._id} className="rounded-lg border border-emerald-100 bg-white p-4">

                                                <div className="flex items-start gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                                        RS
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex items-start justify-between gap-3">

                                                            <div>
                                                                <p className="font-semibold text-slate-800">
                                                                    {comment?.owner}
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

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TaskDetails;