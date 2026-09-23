import { useState } from "react";
import taskService from "../services/taskService.js"
import { useNavigate } from "react-router-dom";
import { Select, TaskCard, Loading, ErrorMessage } from "../components/index.js";
import { useQuery } from "@tanstack/react-query";


function MyTasks() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);


    const tasksQuery = useQuery({
        queryKey: ["myTasks", page, status],
        queryFn: () => taskService.getAssignedTasks({
            page,
            limit: 6,
            status: status === "ALL" ? undefined : status,
        })
    })

    const tasks = tasksQuery.data?.data.assignedTasks || [];
    const isLoading = tasksQuery.isLoading;
    const isError = tasksQuery.isError;
    const error = tasksQuery.error;
    const totalPages = tasksQuery.data?.data.totalPages || 0;


    return (
        isError ?
            <ErrorMessage message={error} onRetry={() => tasksQuery.refetch()} />
            :
            <div className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    {/* Page Header */}
                    <div className="mb-6">

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            My Tasks
                        </h1>

                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Tasks assigned to you across your projects.
                        </p>

                    </div>


                    {/* Main Container */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                        {/* Header */}
                        <div className="border-b border-slate-200 bg-emerald-50/60 px-6 py-6 dark:border-slate-800 dark:bg-emerald-950/20 sm:px-8">

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                            Assigned Tasks
                                        </h2>

                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                            {tasks.length}
                                        </span>

                                    </div>

                                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                                        Tasks currently assigned to you
                                    </p>

                                </div>


                                <Select
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                        setPage(1)
                                    }}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-950 sm:w-44"
                                    options={['ALL', 'TODO', 'IN_PROGRESS', 'DONE']}
                                >
                                </Select>

                            </div>

                        </div>


                        {/* Task Cards */}
                        {
                            isLoading ?
                                <Loading />
                                :
                                tasks.length === 0 ?
                                    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">

                                            <svg
                                                className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h4m4-12H7a2 2 0 00-2 2v14l4-4h8a2 2 0 002-2V6a2 2 0 00-2-2z"
                                                />
                                            </svg>

                                        </div>

                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            No tasks found
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            {status && status !== "ALL"
                                                ? `You don't have any ${status.toLowerCase().replace("_", " ")} tasks.`
                                                : "You don't have any tasks assigned to you yet."
                                            }
                                        </p>

                                    </div>
                                    :
                                    <>
                                        <div className="bg-slate-50 p-6 dark:bg-slate-950/50">

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                                                {tasks.map((task) => (
                                                    <TaskCard key={task._id} task={task} />
                                                ))}

                                            </div>

                                        </div>


                                        {/* Pagination */}
                                        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">

                                            <p className="text-sm text-slate-600 dark:text-slate-400">

                                                Page{" "}
                                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                                    {page}
                                                </span>{" "}
                                                of{" "}
                                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                                    {totalPages}
                                                </span>

                                            </p>


                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => setPage((prev) => prev - 1)}
                                                    disabled={page === 1 || totalPages === 0}
                                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                >
                                                    Previous
                                                </button>

                                                <button
                                                    onClick={() => setPage((prev) => prev + 1)}
                                                    disabled={page === totalPages || totalPages === 0}
                                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    Next
                                                </button>

                                            </div>

                                        </div>
                                    </>
                        }

                    </div>

                </div>
            </div>
    );


}

export default MyTasks;
