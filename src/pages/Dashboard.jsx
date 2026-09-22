import React from "react";
import projectService from "../services/projectService.js";
import taskService from "../services/taskService.js";
import { ErrorMessage, Loading, Button } from "../components/index.js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: () => projectService.getProjects({})
    });

    const tasksQuery = useQuery({
        queryKey: ["myTasks"],
        queryFn: () => taskService.getAssignedTasks({})
    });

    const userProjects = projectsQuery.data?.data.projects || [];
    const userTasks = tasksQuery.data?.data.assignedTasks || [];

    const loader = projectsQuery.isLoading || tasksQuery.isLoading;
    const error = projectsQuery.error || tasksQuery.error;
    const isError = projectsQuery.isError || tasksQuery.isError;

    return isError ? (
        <ErrorMessage
            message={error}
            onRetry={() => {
                projectsQuery.refetch();
                tasksQuery.refetch();
            }}
        />
    ) : (
        <div className="min-h-screen bg-slate-50 px-4 py-8 transition-colors sm:px-6 lg:px-8 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
                        Welcome back! Here's an overview of your projects and tasks.
                    </p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* Projects Card */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/50">
                                    <svg
                                        className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 7h5l2 2h11v10H3V7z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        My Projects
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Projects you're involved in
                                    </p>
                                </div>

                            </div>

                            <Button
                                onClick={() => navigate("/projects")}
                                className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                            >
                                View All
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6">

                            {loader ? (
                                <Loading />
                            ) : userProjects.length === 0 ? (
                                <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center dark:border-slate-700 dark:bg-slate-800/50">
                                    <p className="font-medium text-slate-700 dark:text-slate-200">
                                        No projects yet
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Projects you're involved in will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {userProjects.slice(0, 5).map((project) => (
                                        <div
                                            key={project._id}
                                            className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40"
                                        >
                                            <div className="flex items-center justify-between gap-4">

                                                <div className="min-w-0">
                                                    <h3 className="truncate font-semibold text-slate-800 transition group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-400">
                                                        {project.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        Project
                                                    </p>
                                                </div>

                                                <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                                    {project.status}
                                                </span>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>


                    {/* Tasks Card */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                                    <svg
                                        className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        Assigned Tasks
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Tasks currently assigned to you
                                    </p>
                                </div>

                            </div>

                            <Button
                                onClick={() => navigate("/my-tasks")}
                                className="rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                            >
                                View All
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6">

                            {loader ? (
                                <Loading />
                            ) : userTasks.length === 0 ? (
                                <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center dark:border-slate-700 dark:bg-slate-800/50">
                                    <p className="font-medium text-slate-700 dark:text-slate-200">
                                        No assigned tasks
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Tasks assigned to you will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {userTasks.slice(0, 5).map((task) => (
                                        <div
                                            key={task._id}
                                            className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40"
                                        >
                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">
                                                    <h3 className="truncate font-semibold text-slate-800 transition group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
                                                        {task.name}
                                                    </h3>

                                                    <div className="mt-2 flex flex-wrap gap-2">

                                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                            {task.status}
                                                        </span>

                                                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                                                            {task.priority}
                                                        </span>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;