import { useNavigate, useParams } from "react-router-dom";
import projectService from "../services/projectService";
import taskService from "../services/taskService";
import { Button, ErrorMessage, Loading } from "../components/index.js";
import { toast } from "sonner";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";


function ProjectDetails() {

    const { projectId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const projectQuery = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProjectById(projectId)
    })

    const projectTasksQuery = useQuery({
        queryKey: ["projectTasks", projectId],
        queryFn: () => taskService.getProjectTasks(projectId)
    })

    const project = projectQuery.data?.data
    const tasks = projectTasksQuery.data?.data || []

    const isError = projectQuery.isError || projectTasksQuery.isError;
    const isLoading = projectQuery.isLoading || projectTasksQuery.isLoading
    const error = projectQuery.error || projectTasksQuery.error

    const deleteMutation = useMutation({
        mutationFn: () => projectService.deleteProject(projectId),

        onSuccess: () => {
            console.log("successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })

            navigate("/projects")
            toast.success(`deleted successfully`)
        },

        onError: (error) => {
            console.log("error occured while deleting")
            toast.error(error.message)
        }
    })

    const deleteProjectHandler = () => {
        deleteMutation.mutate();
    }



    return (
        isError ?
            <ErrorMessage message={error} onRetry={() => {
                projectQuery.refetch();
                projectTasksQuery.refetch();
            }} />
            :
            <div className="min-h-screen bg-slate-100 p-6 dark:bg-slate-950">

                {/* Page Header */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                        Project Details
                    </h1>

                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        View project information and manage its tasks.
                    </p>

                </div>

                {/* Project Information */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    {/* Project Header */}
                    <div className="border-b border-slate-200 bg-indigo-50 px-6 py-6 dark:border-slate-800 dark:bg-indigo-950/30">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            {/* Project Title */}
                            <div className="min-w-0">

                                <p className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Project Overview
                                </p>

                                <div className="flex flex-wrap items-center gap-3">

                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {project?.name || "Project"}
                                    </h2>

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                                        {project?.status || "Unknown"}
                                    </span>

                                </div>

                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    View project information and manage its tasks.
                                </p>

                            </div>


                            {/* Project Actions */}
                            <div className="flex flex-wrap gap-2">

                                <Button
                                    onClick={() =>
                                        navigate(`/projects/${projectId}/members`)
                                    }
                                    className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                                >
                                    Members
                                </Button>

                                {project?.currUserRole === "OWNER" && (
                                    <>
                                        <Button
                                            onClick={() =>
                                                navigate(`/projects/${projectId}/edit`)
                                            }
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                        >
                                            Update
                                        </Button>

                                        <Button
                                            onClick={deleteProjectHandler}
                                            disabled={deleteMutation.isPending}
                                            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm ${deleteMutation.isPending
                                                ? "bg-red-900"
                                                : "bg-red-600 transition hover:bg-red-700"
                                                }`}
                                        >
                                            {deleteMutation.isPending ? "Deleting" : "Delete"}
                                        </Button>
                                    </>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* Project Content */}
                    {
                        isLoading ? <Loading /> : <div className="p-6">

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                                {/* Project Owner */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Project Owner
                                    </p>

                                    <div className="mt-4 flex items-center gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-lg font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">

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

                                            <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                                                {project.owner?.username || "Unknown"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Project Owner
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Project Status */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Status
                                    </p>

                                    <div className="mt-4 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-400">
                                            ●
                                        </div>

                                        <div>

                                            <p className="font-semibold text-slate-800 dark:text-slate-100">
                                                {project.status || "Unknown"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Current project status
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Created Date */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Created
                                    </p>

                                    <div className="mt-4 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                            📅
                                        </div>

                                        <div>

                                            <p className="font-semibold text-slate-800 dark:text-slate-100">
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

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Project creation date
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Description */}
                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                            Description
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            About this project
                                        </p>

                                    </div>

                                </div>

                                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700 dark:text-slate-300">
                                    {project.description || "No description available for this project."}
                                </p>

                            </div>

                        </div>
                    }

                </div>


                {/* Tasks */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                    {/* Tasks Header */}
                    <div className="mb-4 flex flex-col gap-4 border-b border-emerald-100 pb-3 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/40">

                        <div>

                            <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
                                Project Tasks
                            </h2>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Tasks belonging to this project
                            </p>

                        </div>


                        {/* Task Actions */}
                        <div className="flex items-center gap-3">

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                {tasks?.length} {tasks?.length === 1 ? "Task" : "Tasks"}
                            </span>


                            {(["OWNER", "ADMIN"].includes(project?.currUserRole)) && (
                                <Button
                                    onClick={() =>
                                        navigate(`/projects/${projectId}/tasks/create`)
                                    }
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                                >
                                    + Create Task
                                </Button>
                            )}

                        </div>

                    </div>



                    {/* Task List */}
                    <div className="space-y-3">

                        {isLoading ? (
                            <Loading />
                        ) : tasks.length > 0 ? (
                            tasks.map((task) => {

                                const priorityStyles = {
                                    LOW: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
                                    MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
                                    HIGH: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
                                };

                                return (
                                    <div
                                        key={task._id}
                                        onClick={() =>
                                            navigate(
                                                `/projects/${projectId}/tasks/${task._id}`
                                            )
                                        }
                                        className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors duration-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
                                    >

                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    {task.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                    {task.description || "No description available."}
                                                </p>
                                            </div>

                                            <span className="w-fit rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                                {task.status}
                                            </span>

                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">

                                            {/* Priority */}
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-slate-500 dark:text-slate-400">
                                                    Priority:
                                                </span>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority] ||
                                                        "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                                                        }`}
                                                >
                                                    {task.priority}
                                                </span>
                                            </div>

                                            {/* Assigned User */}
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-slate-500 dark:text-slate-400">
                                                    Assigned To:
                                                </span>

                                                <span className="text-slate-700 dark:text-slate-300">
                                                    {task.assignedTo?.username || "Unassigned"}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-800/60">

                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    No tasks yet. Create your first task to get started.
                                </p>

                            </div>
                        )}

                    </div>


                </div>

            </div>
    );


}


export default ProjectDetails;