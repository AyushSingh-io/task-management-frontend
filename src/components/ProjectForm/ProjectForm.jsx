import { useForm } from "react-hook-form";
import { Input, Button, Select } from "../index.js"
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService.js";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";




function ProjectForm({ project }) {
    const navigate = useNavigate();

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            status: project?.status || "ACTIVE",
        },
    });


    const queryClient = useQueryClient();

    const createProjectMutation = useMutation({
        mutationFn: (formData) => projectService.createProject(formData),
        onSuccess: () => {
            toast.success("project created successfully");
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
            navigate("/projects")
        },
        onError: (error) => {
            toast.error(error.message)
            setError("root.serverError", {
                type: "server",
                message: error.message
            })
        }
    })

    const updateProjectMutation = useMutation({
        mutationFn: (formData) => projectService.updateProject(project._id, formData),
        onSuccess: () => {
            toast.success("project updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["project", project._id]
            })
            navigate(`/projects/${project._id}`);
        },
        onError: (error) => {
            toast.error(error.message);
            setError("root.serverError", {
                type: "server",
                message: error.message
            })
        }
    })

    const isPending = createProjectMutation.isPending || updateProjectMutation.isPending;

    const submitHandler = async (data) => {
        //convert data to formData:
        const formData = new FormData();

        if (data?.coverImage[0]) {
            formData.append("coverImage", data.coverImage[0])
        }
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("status", data.status)

        if (project) {
            updateProjectMutation.mutate(formData)
        } else {
            createProjectMutation.mutate(formData)
        }
    }

    // useEffect(() => {

    //     if (project) {
    //         reset({
    //             name: project?.name || "",
    //             description: project?.description || "",
    //             status: project?.status || "ACTIVE",
    //         })
    //     }


    // }, [project, reset])




    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
            {/* Header */}
            <div className="border-b border-indigo-100 bg-indigo-50 px-6 py-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
                <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
                    {project ? "Edit Project" : "Create Project"}
                </h2>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {project
                        ? "Update your project details"
                        : "Create a new project to start managing your tasks"
                    }
                </p>
            </div>


            {/* Form Fields */}
            <div className="space-y-5 bg-slate-50 p-6 dark:bg-slate-950/40">

                {errors.root?.serverError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/60 dark:bg-red-950/30">
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                            {errors.root.serverError.message}
                        </p>
                    </div>
                )}


                {/* Name */}
                <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <Input
                        label="Project Name"
                        placeholder="Enter project name"
                        {...register("name")}
                    />
                </div>


                {/* Description */}
                <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <Input
                        label="Description"
                        placeholder="Enter project description"
                        {...register("description")}
                    />
                </div>


                {/* Cover Image */}
                <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <Input
                        label="Cover Image"
                        type="file"
                        {...register("coverImage")}
                    />
                </div>


                {/* Status */}
                {project && (
                    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <Select
                            label="Status"
                            options={["ACTIVE", "ARCHIVED", "COMPLETED"]}
                            {...register("status")}
                        />
                    </div>
                )}

            </div>


            {/* Footer / Action */}
            <div className="flex justify-end border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
                <Button
                    disabled={isPending}
                    type="submit"
                    className={`min-w-36 rounded-md px-5 py-2.5 font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${isPending
                            ? "cursor-not-allowed bg-indigo-800 dark:bg-indigo-950"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {isPending
                        ? (project ? "Updating" : "Creating")
                        : (project ? "Update Project" : "Create Project")
                    }
                </Button>
            </div>

        </form>
    );


}


export default ProjectForm;