import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService.js"
import { setAssignedTasks } from "../store/taskSlice.js"
import { useNavigate } from "react-router-dom";
import { Select, Button, TaskCard } from "../components/index.js";


function MyTasks() {
    const tasks = useSelector((state) => state.task.assignedTasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("tasks ", tasks)

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const res = await taskService.getAssignedTasks();
                console.log(res)
                if (res) {
                    dispatch(setAssignedTasks(res?.data));
                }

            } catch (error) {
                console.log("MYTASKS ERROR : ", error)
            }
        }

        fetchAssignedTasks()

    }, [])



    return (
        <div className="min-h-screen bg-green-50 px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-10">
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
                                className="w-full rounded-lg border border-green-200 bg-white px-4 py-2.5 text-sm font-medium text-green-800 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-44"
                            >
                                <option>All Tasks</option>
                                <option>TODO</option>
                                <option>IN_PROGRESS</option>
                                <option>DONE</option>
                            </Select>
                        </div>
                    </div>


                    {/* Task Cards */}
                    <div className="bg-green-50/30 p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {tasks.map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MyTasks;
