
import React from "react";
import { Button } from "../components/index";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
    const navigate = useNavigate();

    const priorityStyles = {
        HIGH: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60",
        MEDIUM: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/60",
        LOW: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60",
    };

    const statusStyles = {
        COMPLETED:
            "bg-green-100 text-green-700 ring-1 ring-inset ring-green-200 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-900/60",
        IN_PROGRESS:
            "bg-lime-100 text-lime-700 ring-1 ring-inset ring-lime-200 dark:bg-lime-950/40 dark:text-lime-400 dark:ring-lime-900/60",
        TODO:
            "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-900/60",
    };

    return (
        <div className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">

            {/* Top accent */}
            <div
                className={`absolute inset-x-0 top-0 h-1 ${task.priority === "HIGH"
                        ? "bg-red-500"
                        : task.priority === "MEDIUM"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                    }`}
            />

            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-lg font-bold leading-6 text-slate-900 transition-colors  dark:text-white ">
                            {task.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-1.5">
                            <svg
                                className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7h5l2 2h11v10H3V7z"
                                />
                            </svg>

                            <p className="truncate text-sm font-semibold text-slate-600 dark:text-slate-400">
                                {task.project?.name || "Unknown Project"}
                            </p>
                        </div>
                    </div>

                    {/* Priority */}
                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${priorityStyles[task.priority] ||
                            "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                            }`}
                    >
                        {task.priority}
                    </span>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-slate-200 dark:border-slate-800" />

                {/* Description */}
                <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
                        Description
                    </p>

                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {task.description || "No description available."}
                    </p>
                </div>

                {/* Metadata */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                    {/* Status */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors group-hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:group-hover:bg-slate-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
                            Status
                        </p>

                        <span
                            className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[task.status] ||
                                "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>

                    {/* Due Date */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors group-hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:group-hover:bg-slate-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
                            Due Date
                        </p>

                        <div className="mt-2 flex items-center gap-1.5">
                            <svg
                                className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>

                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {task.dueDate
                                    ? new Date(task.dueDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : "No due date"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <Button
                    onClick={() =>
                        navigate(
                            `/projects/${task.project._id}/tasks/${task._id}`
                        )
                    }
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                >
                    View Task

                    <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
}

export default TaskCard;
