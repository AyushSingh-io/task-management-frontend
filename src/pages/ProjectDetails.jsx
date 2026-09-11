import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectService from "../services/projectService";
import taskService from "../services/taskService";
import { Button, ErrorMessage, Loading } from "../components/index.js";


function ProjectDetails() {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteProjectHandler = async () => {

        try {
            setIsDeleting(true)
            const deletedProjectRes = await projectService.deleteProject(projectId);

            if (deletedProjectRes) {
                navigate("/projects");
                setIsDeleting(false)
            }
        } catch (error) {
            console.log("DELETE PROJECT ERROR ", error);

        }
    };

    const fetchProjectDetails = async () => {
        try {
            setError("")
            const [project, tasks] = await Promise.all([
                projectService.getProjectById(projectId),
                taskService.getProjectTasks(projectId)
            ]);

            if (project) {
                setProject(project.data);
            }

            if (tasks && tasks.data?.length > 0) {
                setTasks(tasks.data);
            }

        } catch (error) {
            setError(error.message)
        }
        finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchProjectDetails();

    }, [projectId]);


    return (
        error ?
            <ErrorMessage message={error} onRetry={fetchProjectDetails} />
            :
            <div className="min-h-screen bg-slate-100 p-6">

                {/* Page Header */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-indigo-700">
                        Project Details
                    </h1>

                    <p className="mt-1 text-slate-500">
                        View project information and manage its tasks.
                    </p>

                </div>


                Project Information

                {/* Project Information */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* Project Header */}
                    <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white px-6 py-6">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            {/* Project Title */}
                            <div className="min-w-0">

                                <p className="mb-1 text-sm font-medium text-indigo-600">
                                    Project Overview
                                </p>

                                <div className="flex flex-wrap items-center gap-3">

                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {project.name || "Project"}
                                    </h2>

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                        {project.status || "Unknown"}
                                    </span>

                                </div>

                                <p className="mt-2 text-sm text-slate-500">
                                    View project information and manage its tasks.
                                </p>

                            </div>


                            {/* Project Actions */}
                            <div className="flex flex-wrap gap-2">

                                <Button
                                    onClick={() =>
                                        navigate(`/projects/${projectId}/edit`)
                                    }
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    Update
                                </Button>

                                <Button
                                    onClick={() =>
                                        navigate(`/projects/${projectId}/members`)
                                    }
                                    className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                                >
                                    Show Members
                                </Button>

                                <Button
                                    onClick={deleteProjectHandler}
                                    disabled={isDeleting}
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm  ${isDeleting ? "bg-red-900" : "bg-red-600 transition hover:bg-red-700"}`}
                                >
                                    {isDeleting ? "Deleting" : "Delete"}
                                </Button>

                            </div>

                        </div>

                    </div>


                    {/* Project Content */}
                    {
                        isLoading ? <Loading /> : <div className="p-6">

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                                {/* Project Owner */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Project Owner
                                    </p>

                                    <div className="mt-4 flex items-center gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">

                                            {project.owner?.avatar ? (
                                                <img
                                                    src={project.owner.avatar}
                                                    alt={project.owner.username}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                project.owner?.username
                                                    ?.charAt(0)
                                                    .toUpperCase() || "?"
                                            )}

                                        </div>

                                        <div className="min-w-0">

                                            <p className="truncate font-semibold text-slate-800">
                                                {project.owner?.username || "Unknown"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Project Owner
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Project Status */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Status
                                    </p>

                                    <div className="mt-4 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                            ●
                                        </div>

                                        <div>

                                            <p className="font-semibold text-slate-800">
                                                {project.status || "Unknown"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Current project status
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Created Date */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Created
                                    </p>

                                    <div className="mt-4 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                            📅
                                        </div>

                                        <div>

                                            <p className="font-semibold text-slate-800">
                                                {project.createdAt
                                                    ? new Date(project.createdAt).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : "--"
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Project creation date
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Description */}
                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Description
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            About this project
                                        </p>

                                    </div>

                                </div>

                                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
                                    {project.description || "No description available for this project."}
                                </p>

                            </div>

                        </div>
                    }
                </div>




                {/* Tasks */}
                <div className="rounded-xl bg-white p-5 shadow-md">

                    {/* Tasks Header */}
                    <div className="mb-4 flex flex-col gap-4 border-b border-emerald-100 pb-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="text-xl font-semibold text-emerald-700">
                                Project Tasks
                            </h2>

                            <p className="text-sm text-slate-500">
                                Tasks belonging to this project
                            </p>

                        </div>


                        {/* Task Actions */}
                        <div className="flex items-center gap-3">

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                                {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
                            </span>


                            <Button
                                onClick={() =>
                                    navigate(`/projects/${projectId}/tasks/create`)
                                }
                                className="bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 rounded-sm"
                            >
                                + Create Task
                            </Button>

                        </div>

                    </div>


                    {/* Task List */}
                    <div className="space-y-3">

                        {isLoading ? <Loading /> :
                            tasks.length > 0
                                ? tasks.map((task) => (

                                    <div
                                        key={task._id}
                                        onClick={() =>
                                            navigate(`/projects/${projectId}/tasks/${task._id}`)
                                        }
                                        className="cursor-pointer rounded-lg border border-amber-100 bg-amber-50 p-4 transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-sm"
                                    >

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                            <div>

                                                <h3 className="font-semibold text-amber-900">
                                                    {task.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-amber-700">
                                                    {task.description}
                                                </p>

                                            </div>


                                            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
                                                {task.status}
                                            </span>

                                        </div>


                                        <div className="mt-3 flex flex-wrap gap-4 text-sm">

                                            <p className="font-medium text-slate-600">
                                                Priority:
                                                <span className="ml-1 text-amber-600">
                                                    {task.priority}
                                                </span>
                                            </p>


                                            <p className="font-medium text-slate-600">
                                                Assigned:
                                                <span className="ml-1 text-slate-700">
                                                    {task.assignedTo}
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                ))
                                :
                                <div className="rounded-lg border border-amber-100 bg-amber-50 p-6 text-center">

                                    <p className="text-sm font-medium text-amber-700">
                                        No tasks yet. Create your first task to get started.
                                    </p>

                                </div>
                        }



                    </div>

                </div>

            </div>
    );
}


export default ProjectDetails;