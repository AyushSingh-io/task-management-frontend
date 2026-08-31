import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../index.js"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService.js";



function ProjectForm({ project }) {
    console.log('INSIDE PROEJCT FORM , PROJECT IS : ', project)
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            coverImage: project?.coverImage || "",
            status: project?.status || "ACTIVE",
        },
    });

    const navigate = useNavigate();


    const submitHandler = async (data) => {
        //convert data to formData:
        console.log('Form -> data is :' , data)
        const formData = new FormData();

        if (data?.coverImage[0]) {
            formData.append("coverImage", data.coverImage[0])
        }
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("status", data.status)


        if (project) { //update project
            const updatedProject = await projectService.updateProject(project._id, formData);
            if (updatedProject) {
                navigate("/projects");
            }
        }
        else {
            const newProject = await projectService.createProject(formData);
            if (newProject) {
                navigate("/projects");
            }
        }
    }



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
                {project &&  <div className="rounded-lg border border-indigo-100 bg-white p-4">
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
                    type="submit"
                    className="min-w-36 "
                >
                    {project ? "Update Project" : "Create Project"}
                </Button>
            </div>

        </form>
    )
}

export default ProjectForm;