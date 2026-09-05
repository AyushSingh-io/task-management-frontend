import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService.js"
import setAssignedTasks from "../store/taskSlice.js"
import { useNavigate } from "react-router-dom";


function MyTasks() {
    const tasks = useSelector((state) => state.task.assignedTasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const res = await taskService.getAssignedTasks();
                console.log(res)
                if (res) {
                    dispatch(setAssignedTasks(res.data));
                }

            } catch (error) {
                console.log("MYTASKS ERROR : ", error)
            }
        }

        fetchAssignedTasks()

    }, [dispatch])



    return (
        <div className="min-h-screen bg-green-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-950">
                        My Tasks
                    </h1>

                    <p className="mt-2 text-sm text-green-700">
                        Tasks assigned to you across your projects.
                    </p>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm">

                    {/* Section Header */}
                    <div className="flex flex-col gap-4 border-b border-green-100 bg-green-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="text-lg font-semibold text-green-950">
                                Assigned Tasks
                            </h2>

                            <p className="mt-1 text-sm text-green-700">
                                {tasks.length} tasks assigned to you
                            </p>
                        </div>

                        <select
                            className="rounded-lg border border-green-200 bg-white px-4 py-2 text-sm text-green-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        >
                            <option>All Tasks</option>
                            <option>TODO</option>
                            <option>IN_PROGRESS</option>
                            <option>COMPLETED</option>
                        </select>
                    </div>

                    {/* Task List */}
                    <div className="divide-y divide-green-100">

                        {tasks && tasks.map((task) => (
                            <div
                                key={task._id}
                                className="p-5 transition hover:bg-green-50/60"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Task Info */}
                                    <div className="min-w-0 flex-1">

                                        <div className="mb-2 flex flex-wrap items-center gap-2">

                                            <h3 className="text-lg font-semibold text-green-950">
                                                {task.title}
                                            </h3>

                                            {/* Status */}
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.status === "COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : task.status === "IN PROGRESS"
                                                        ? "bg-lime-100 text-lime-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>

                                            {/* Priority */}
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${task.priority === "HIGH"
                                                    ? "bg-red-100 text-red-700"
                                                    : task.priority === "MEDIUM"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>

                                        </div>

                                        <p className="mb-1 text-sm font-medium text-green-700">
                                            {task.project}
                                        </p>

                                        <p className="line-clamp-2 text-sm text-green-800/70">
                                            {task.description}
                                        </p>

                                    </div>

                                    {/* Task Meta */}
                                    <div className="flex items-center justify-between gap-6 lg:justify-end">

                                        <div>
                                            <p className="text-xs text-green-600/70">
                                                Due date
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-green-900">
                                                {task.dueDate}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/projects/${task.project}/tasks/${task._id}`)}
                                            type="button"
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                        >
                                            View
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTasks;
