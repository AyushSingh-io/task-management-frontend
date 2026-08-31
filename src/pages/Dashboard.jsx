import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import projectService from "../services/projectService.js";
import { setProjects } from "../store/projectSlice.js"
import taskService from "../services/taskService.js";
import { setAssignedTasks } from "../store/taskSlice.js";


function Dashboard() {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const userProjects = useSelector((state) => state.project.projects);
    const userTasks = useSelector((state) => state.task.assignedTasks);


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setError("")
                const [projects, myTasks] = await Promise.all([
                    projectService.getProjects(),
                    taskService.getAssignedTasks()
                ])

                console.log(projects)
                console.log(myTasks)
                
                if (projects?.data) {
                    dispatch(setProjects(projects.data))
                }
                if (myTasks?.data) {
                    dispatch(setAssignedTasks(myTasks.data))
                }

            } catch (error) {
                setError(error.message)
                console.log("Error in dashboard :", error)
            }
            finally {
                setLoader(false)
            }
        }
        fetchDashboardData()

    }, [dispatch])

    return error ? (<div className="text-red-600 text-center">{error}</div>) : (
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

                    <div className="mb-4 border-b border-indigo-100 pb-3">
                        <h2 className="text-xl font-semibold text-indigo-700">
                            My Projects
                        </h2>

                        <p className="text-sm text-slate-500">
                            Projects you're involved in
                        </p>
                    </div>



                    {loader ? <div>Loading...</div> : <div className="space-y-3">
                        {
                            userProjects.map((project) => (
                                <div key={project._id} className="rounded-lg border border-indigo-100 bg-indigo-50 p-4" >
                                    <h3 className="font-medium text-indigo-900">
                                        {project.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-indigo-600">
                                        {project.status}
                                    </p>
                                </div>
                            ))
                        }

                    </div>}

                </div>


                {/* Assigned Tasks */}
                <div className="rounded-xl bg-white p-5 shadow-md">

                    <div className="mb-4 border-b border-emerald-100 pb-3">
                        <h2 className="text-xl font-semibold text-emerald-700">
                            Assigned Tasks
                        </h2>

                        <p className="text-sm text-slate-500">
                            Tasks currently assigned to you
                        </p>
                    </div>

                    {loader ? <div>Loading...</div> : <div className="space-y-3">
                        {
                            userTasks.map((task) => (
                                <div key={task._id} className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                                    <h3 className="font-medium text-amber-900">
                                        {task.name}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-amber-600">
                                        Status : {task.status}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-amber-600">
                                        Priority : {task.priority}
                                    </p>

                                </div>
                            ))
                        }

                    </div>}

                </div>

            </div>

        </div >
    )
}

export default Dashboard