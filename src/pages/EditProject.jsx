import React, { useEffect, useState } from "react";
import { ErrorMessage, Loading, ProjectForm } from '../components/index.js'
import { useParams } from "react-router-dom";
import projectService from "../services/projectService.js";

function EditProject() {
    const { projectId } = useParams();

    const [project, setProject] = useState({});
    const [isLoading , setIsLoading] = useState(true);
    const [error , setError] = useState(null)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const p = await projectService.getProjectById(projectId);
                if (p) {
                    setProject(p.data);
                    setIsLoading(false)
                }

            } catch (error) {
                setError(error.message)
            }
        }

        fetchProject();

    }, [projectId])

    if(isLoading){
        return ( <Loading/>)
    }

    if(error){
        return <ErrorMessage/>
    }

    return (

        <ProjectForm project={project} />
    )

}

export default EditProject;