import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../index.js"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService.js";
import { toast } from "sonner";



function ProjectForm({ project }) {
    const [isCreating, setIsCreating] = useState(false)

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            status: project?.status || "ACTIVE",
        },
    });

    const navigate = useNavigate();


    const submitHandler = async (data) => {
        //convert data to formData:
        try {
            setIsCreating(true)
            const formData = new FormData();

            if (data?.coverImage[0]) {
                formData.append("coverImage", data.coverImage[0])
            }
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("status", data.status)


            if (project) { //update project
                const updatedProjectRes = await projectService.updateProject(project._id, formData);
                if (updatedProjectRes) {

                    navigate(`/projects/${updatedProjectRes.data._id}`);
                    setIsCreating(false)
                    toast.success("Project updated successfully");
                }
            }
            else {
                const newProjectRes = await projectService.createProject(formData);
                if (newProjectRes) {

                    navigate("/projects");
                    setIsCreating(false)
                    toast.success("Project created successfully")
                }
            }

        } catch (error) {
            console.log("ProjectForm error : ", error);

            setError("root.serverError", {
                type: "server",
                message: error.message
            })

            toast.error(error.message)

            setIsCreating(false)
        }
    }

    useEffect(() => {

        if (project) {
            reset({
                name: project?.name || "",
                description: project?.description || "",
                status: project?.status || "ACTIVE",
            })
        }


    }, [project, reset])



    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50 shadow-md"
        >
            {/* Header */}
            <div className="border-b border-indigo-100 bg-indigo-100/70 px-6 py-5">
                <h2 className="text-2xl font-semibold text-indigo-700">
                    {project ? "Edit Project" : "Create Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                    {project
                        ? "Update your project details"
                        : "Create a new project to start managing your tasks"
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
                <div className="rounded-lg border border-indigo-100 bg-white p-4">
                    <Input
                        label="Project Name"
                        placeholder="Enter project name"
                        {...register("name")}
                    />
                </div>


                {/* Description */}
                <div className="rounded-lg border border-indigo-100 bg-white p-4">
                    <Input
                        label="Description"
                        placeholder="Enter project description"
                        {...register("description")}
                    />
                </div>


                {/* Cover Image */}
                <div className="rounded-lg border border-indigo-100 bg-white p-4">
                    <Input
                        label="Cover Image"
                        type="file"
                        {...register("coverImage")}
                    />
                </div>


                {/* Status */}
                {project && <div className="rounded-lg border border-indigo-100 bg-white p-4">
                    <Select
                        label="Status"
                        options={["ACTIVE", "ARCHIVED", "COMPLETED"]}
                        {...register("status")}
                    />
                </div>}

            </div>


            {/* Footer / Action */}
            <div className="flex justify-end border-t border-indigo-100 bg-white px-6 py-4">
                <Button
                    disabled ={isCreating}
                    type="submit"
                    className={`min-w-36 rounded-md px-5 py-2.5 font-medium text-white transition
        ${isCreating
                            ? "bg-indigo-800 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {
                        isCreating ? (project ? "Updating" : "Creating") :
                            (project ? "Update Project" : "Create Project")
                    }
                </Button>
            </div>

        </form>
    )
}

export default ProjectForm;