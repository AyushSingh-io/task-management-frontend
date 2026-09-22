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
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">
                    Dashboard
                </h1>

                <p className="mt-1 text-slate-500">
                    Welcome back! Here's your overview.
                </p>
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Projects */}
                <div className="rounded-xl bg-white p-5 shadow-md">

                    <div className="mb-4 flex items-center justify-between border-b border-indigo-100 pb-3">
                        <div>
                            <h2 className="text-xl font-semibold text-indigo-700">
                                My Projects
                            </h2>

                            <p className="text-sm text-slate-500">
                                Projects you're involved in
                            </p>
                        </div>


                        <Button
                            onClick={() => navigate("/projects")}
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            View All
                        </Button>


                    </div>

                    {loader ? (
                        <Loading />
                    ) : (
                        <div className="space-y-3">
                            {userProjects.slice(0, 5).map((project) => (
                                <div
                                    key={project._id}
                                    className="rounded-lg border border-indigo-100 bg-indigo-50 p-4"
                                >
                                    <h3 className="font-medium text-indigo-900">
                                        {project.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-indigo-600">
                                        {project.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Assigned Tasks */}
                <div className="rounded-xl bg-white p-5 shadow-md">

                    <div className="mb-4 flex items-center justify-between border-b border-emerald-100 pb-3">
                        <div>
                            <h2 className="text-xl font-semibold text-emerald-700">
                                Assigned Tasks
                            </h2>

                            <p className="text-sm text-slate-500">
                                Tasks currently assigned to you
                            </p>
                        </div>

                        <Button
                            onClick={() => navigate("/my-tasks")}
                            className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            View All
                        </Button>
                    </div>

                    {loader ? (
                        <Loading />
                    ) : (
                        <div className="space-y-3">
                            {userTasks.slice(0, 5).map((task) => (
                                <div
                                    key={task._id}
                                    className="rounded-lg border border-amber-100 bg-amber-50 p-4"
                                >
                                    <h3 className="font-medium text-amber-900">
                                        {task.name}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-amber-600">
                                        Status: {task.status}
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-amber-600">
                                        Priority: {task.priority}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;

