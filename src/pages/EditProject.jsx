import React, { useEffect, useState } from "react";
import { ProjectForm } from '../components/index.js'
import { useParams } from "react-router-dom";
import projectService from "../services/projectService.js";

function EditProject() {
    const { projectId } = useParams();
    console.log('IN EDITPROJECT PAGE : PROJECT ID ' , projectId)
    const [project, setProject] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            const p = await projectService.getProjectById(projectId);
            if (p) {
                setProject(p.data);
            }
        }

        fetchProject();

    }, [projectId])

    return (
        <ProjectForm project={project} />
    )

}

export default EditProject;