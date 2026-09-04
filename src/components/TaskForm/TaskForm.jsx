import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Select } from "../index.js"
import taskService from "../../services/taskService.js"


function TaskForm({ task }) {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        defaultValues: {
            name: task?.name || "",
            description: task?.description || "",
            status: task?.status || "TODO",
            priority: task?.priority || "MEDIUM",
            dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
            completedAt: task?.completedAt ? new Date(task.completedAt).toISOString().split("T")[0] : ""
        }
    });
    const navigate = useNavigate();
    const { projectId, taskId } = useParams();


    const submitHandler = async (data) => {
        try {
            if (task) {
                const res = await taskService.updateTaskById(taskId, data);
                if (res) {
                    navigate(`/projects/${projectId}`)
                }
            }
            else {
                const res = await taskService.createTask(projectId, data)
                if (res) {
                    navigate(`/projects/${projectId}`);
                }
            }
        } catch (error) {
            setError("root.serverError", {
                type: "server",
                message: error.message
            })
        }
    }

    useEffect(() => {
        reset({
            name: task?.name || "",
            description: task?.description || "",
            status: task?.status || "TODO",
            priority: task?.priority || "MEDIUM",
            dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
            completedAt: task?.completedAt ? new Date(task.completedAt).toISOString().split('T')[0] : ""
        })
    }, [task, reset])

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-md"
        >

            {/* Header */}
            <div className="border-b border-emerald-100 bg-emerald-100/70 px-6 py-5">
                <h2 className="text-2xl font-semibold text-emerald-700">
                    {task ? "Edit Task" : "Create Task"}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                    {task
                        ? "Update your task details"
                        : "Create a new task to start working on your project"
                    }
                </p>
            </div>


            {/* Form Fields */}
            <div className="space-y-5 p-6">

                {errors.root?.serverError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm font-medium text-red-600">
                            {errors.root.serverError.message}
                        </p>
                    </div>
                )}


                {/* Name */}
                <div className="rounded-lg border border-emerald-100 bg-white p-4">
                    <Input
                        label="Task Name"
                        placeholder="Enter task name"
                        {...register("name")}
                    />
                </div>


                {/* Description */}
                <div className="rounded-lg border border-emerald-100 bg-white p-4">
                    <Input
                        label="Description"
                        placeholder="Enter task description"
                        {...register("description")}
                    />
                </div>


                {/* Dates */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="rounded-lg border border-emerald-100 bg-white p-4">
                        <Input
                            label="Due Date"
                            type="date"
                            {...register("dueDate")}
                        />
                    </div>

                    <div className="rounded-lg border border-emerald-100 bg-white p-4">
                        <Input
                            label="Completed At"
                            type="date"
                            {...register("completedAt")}
                        />
                    </div>

                </div>


                {/* Status */}
                <div className="rounded-lg border border-emerald-100 bg-white p-4">
                    <Select
                        label="Status"
                        options={["TODO", "IN_PROGRESS", "DONE"]}
                        {...register("status")}
                    />
                </div>


                {/* Priority */}
                <div className="rounded-lg border border-emerald-100 bg-white p-4">
                    <Select
                        label="Priority"
                        options={["LOW", "MEDIUM", "HIGH"]}
                        {...register("priority")}
                    />
                </div>

            </div>


            {/* Footer / Action */}
            <div className="flex justify-end border-t border-emerald-100 bg-white px-6 py-4">
                <Button
                    type="submit"
                    className="min-w-36"
                >
                    {task ? "Update Task" : "Create Task"}
                </Button>
            </div>

        </form>
    )
}


export default TaskForm;