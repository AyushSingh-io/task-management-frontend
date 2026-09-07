
import React from "react";
import { Button } from "../components/index";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
   const navigate = useNavigate();
   console.log(task)

    return (
        <div className="flex min-h-[320px] flex-col rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                    <h3 className="line-clamp-2 text-lg font-bold leading-6 text-green-950">
                        {task.title}
                    </h3>

                    <p className="mt-2 truncate text-sm font-semibold text-green-700">
                        {task.project?.name || "Unknown Project"}
                    </p>
                </div>

                {/* Priority */}
                <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${task.priority === "HIGH"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "MEDIUM"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-700"
                        }`}
                >
                    {task.priority}
                </span>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-green-100" />

            {/* Description */}
            <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-green-600/60">
                    Description
                </p>

                <p className="mt-2 line-clamp-4 text-sm leading-6 text-green-950/65">
                    {task.description || "No description available."}
                </p>
            </div>

            {/* Metadata */}
            <div className="mt-6 grid grid-cols-2 gap-3">

                {/* Status */}
                <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-600/60">
                        Status
                    </p>

                    <span
                        className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${task.status === "COMPLETED"
                                ? "bg-green-100 text-green-700"
                                : task.status === "IN_PROGRESS"
                                    ? "bg-lime-100 text-lime-700"
                                    : "bg-emerald-100 text-emerald-700"
                            }`}
                    >
                        {task.status}
                    </span>
                </div>

                {/* Due Date */}
                <div className="rounded-xl bg-green-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-600/60">
                        Due Date
                    </p>

                    <p className="mt-2 text-xs font-semibold text-green-950">
                        {task.dueDate
                            ? new Date(task.dueDate)
                                .toISOString()
                                .split("T")[0]
                            : "__"}
                    </p>
                </div>

            </div>

            {/* Action */}
            <Button
                onClick={() => navigate(`/projects/${task.project._id}/tasks/${task._id}`) }
                type="button"
                className="mt-5 w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
                View Task
            </Button>

        </div>
    );
}

export default TaskCard;
