import React, { useEffect, useState } from "react";
import { ErrorMessage, Loading, ProjectForm } from '../components/index.js'
import { useParams } from "react-router-dom";
import projectService from "../services/projectService.js";
import { useQuery } from "@tanstack/react-query";

function EditProject() {
    const { projectId } = useParams();

    const projectQuery = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProjectById(projectId)
    })

    if (projectQuery.isLoading) {
        return (<Loading />)
    }

    if (projectQuery.isError) {
        return <ErrorMessage message={projectQuery.error} onRetry={projectQuery.refetch} />
    }

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 dark:bg-slate-950"> <ProjectForm project={projectQuery.data?.data} /> </main>
    )

}

export default EditProject;