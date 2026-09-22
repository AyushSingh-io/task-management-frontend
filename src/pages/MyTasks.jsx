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
            <div className="min-h-screen bg-green-50 px-4 py-10 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight text-green-950">
                            My Tasks
                        </h1>

                        <p className="mt-2 text-sm text-green-700/80">
                            Tasks assigned to you across your projects.
                        </p>
                    </div>

                    {/* Main Container */}
                    <div className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">

                        {/* Header */}
                        <div className="border-b border-green-100 bg-green-50/60 px-6 py-6 sm:px-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-bold text-green-950">
                                            Assigned Tasks
                                        </h2>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                            {tasks.length}
                                        </span>
                                    </div>

                                    <p className="mt-1.5 text-sm text-green-700/70">
                                        Tasks currently assigned to you
                                    </p>
                                </div>

                                <Select
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                        setPage(1)
                                    }}
                                    className="w-full rounded-lg border border-green-200 bg-white px-4 py-2.5 text-sm font-medium text-green-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-44"
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
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                            <svg
                                                className="h-8 w-8 text-green-600"
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

                                        <h3 className="text-lg font-semibold text-green-950">
                                            No tasks found
                                        </h3>

                                        <p className="mt-2 text-sm text-green-700/70">
                                            {status && status !== "ALL"
                                                ? `You don't have any ${status.toLowerCase().replace("_", " ")} tasks.`
                                                : "You don't have any tasks assigned to you yet."

                                            }
                                        </p>
                                    </div>
                                    :
                                    <>
                                        <div className="bg-green-50/30 p-6">
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                                {tasks.map((task) => (
                                                    <TaskCard key={task._id} task={task} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex items-center justify-between border-t border-green-100 bg-white px-6 py-4">
                                            <p className="text-sm text-green-700">
                                                Page <span className="font-semibold">{page}</span> of{" "}
                                                <span className="font-semibold">{totalPages}</span>
                                            </p>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setPage((prev) => prev - 1)}
                                                    disabled={page === 1 || totalPages === 0}
                                                    className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    Previous
                                                </button>

                                                <button
                                                    onClick={() => setPage((prev) => prev + 1)}
                                                    disabled={page === totalPages || totalPages === 0}
                                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
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
