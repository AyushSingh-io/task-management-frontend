import api from "./api.js"

const projectService = {
    createProject: (data) => api("/projects", {
        method: "POST",
        body: data   //FormData
    }),

    getProjects: () => api("/projects"),

    getProjectById: (projectId) => api(`/projects/${projectId}`),

    updateProject: (projectId, data) => api(`/projects/${projectId}`, {
        method: "PATCH",
        body: data   //FormData
    }),

    deleteProject: (projectId) => api(`/projects/${projectId}`, {
        method: "DELETE",
    }),

}

export default projectService;