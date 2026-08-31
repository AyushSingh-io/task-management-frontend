import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectService from "../services/projectService";
import { setProjects } from "../store/projectSlice";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";

function Projects() {
    const dispatch = useDispatch();
    const userProjects = useSelector((state) => state.project.projects);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await projectService.getProjects();

                if (projects?.data) {
                    dispatch(setProjects(projects.data));
                }
            } catch (error) {
                console.log("Projects fetch error:", error);
            }
        };

        fetchProjects();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        My Projects
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Projects you are involved in
                    </p>
                </div>

                {/* Create Project Button */}
                <button
                    onClick={() => navigate("/project/create")}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <span className="text-lg leading-none">+</span>
                    Create Project
                </button>

            </div>

            {/* Projects */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userProjects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                    />
                ))}
            </div>

        </div>
    );
}

export default Projects;
