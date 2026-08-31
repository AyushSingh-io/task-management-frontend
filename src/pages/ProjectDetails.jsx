import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectService from "../services/projectService";
import taskService from "../services/taskService";
import { Button } from "../components/index.js";


function ProjectDetails() {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState([]);


    const deleteProjectHandler = async () => {

        const deletedProject = await projectService.deleteProject(projectId);

        if (deletedProject) {
            navigate("/projects");
        }
    };


    useEffect(() => {

        const fetchProjectDetails = async () => {

            const [project, tasks] = await Promise.all([
                projectService.getProjectById(projectId),
                taskService.getProjectTasks(projectId)
            ]);

            console.log(project, tasks);


            if (project) {
                setProject(project.data);
            }


            if (tasks && tasks.data?.length > 0) {
                setTasks(tasks.data);
            }

        };


        fetchProjectDetails();

    }, [projectId]);


    return (
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


            {/* Project Information */}
            <div className="mb-6 rounded-xl bg-white p-5 shadow-md">

                {/* Project Header */}
                <div className="mb-4 flex flex-col gap-4 border-b border-indigo-100 pb-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-700">
                            Project Information
                        </h2>

                        <p className="text-sm text-slate-500">
                            Details about this project
                        </p>
                    </div>


                    {/* Project Actions */}
                    <div className="flex gap-2">

                        <Button
                            onClick={() =>
                                navigate(`/projects/${projectId}/edit`)
                            }
                            className="bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 rounded-sm"
                        >
                            Update
                        </Button>


                        <Button
                            onClick={deleteProjectHandler}
                            className="bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 rounded-sm"
                        >
                            Delete
                        </Button>

                    </div>

                </div>


                {/* Project Details */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Name */}
                    <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                        <p className="text-sm font-medium text-indigo-500">
                            Project Name
                        </p>

                        <p className="mt-1 text-lg font-semibold text-indigo-900">
                            {project.name}
                        </p>

                    </div>


                    {/* Status */}
                    <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">

                        <p className="text-sm font-medium text-indigo-500">
                            Status
                        </p>

                        <p className="mt-1 font-semibold text-indigo-900">
                            {project.status}
                        </p>

                    </div>


                    {/* Description */}
                    <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4 md:col-span-2">

                        <p className="text-sm font-medium text-indigo-500">
                            Description
                        </p>

                        <p className="mt-1 text-slate-700">
                            {project.description}
                        </p>

                    </div>

                </div>

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

                    {
                        tasks.length > 0
                            ? tasks.map((task) => (

                                <div
                                    key={task._id}
                                    onClick={() =>
                                        navigate(`/tasks/${task._id}`)
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