import api from "./api.js"

const projectService = {
    createProject: (data) => api("/projects", {
        method: "POST",
        body: data   //FormData
    }),

    getProjects: ({page = 1 , limit = 5 , status , search = ""}) => {
        const params = new URLSearchParams();
        params.append("page" , page);
        params.append("limit", limit)

        if(status){
            params.append("status",status)
        }
        if(search){
            params.append("search" , search)
        }

        return api(`/projects?${params.toString()}`)
    },

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