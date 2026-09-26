import api from "./api.js"

const taskService = {
    createTask: (projectId , data) => api(`/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify(data)
    }),

    getProjectTasks: (projectId) => api(`/projects/${projectId}/tasks`),

    getAssignedTasks: ({page = 1 , limit = 10 , status = "" , search }) => {
        const params = new URLSearchParams();
        params.append("page" ,page);
        params.append("limit", limit);
        
        if(status){
            params.append("status",status);
        }

        if(search){
            params.append("search" , search);
        }

        return api(`/tasks?${params.toString()}`)
    },

    getTaskById: (taskId) => api(`/tasks/${taskId}`),

    updateTaskById: (taskId , data) => api(`/tasks/${taskId}`, {
        method: "PATCH",
        body : JSON.stringify(data)
    }),

    deleteTaskById : (taskId) => api(`/tasks/${taskId}`, {
        method: "DELETE",
    }),

    assignTask: (taskId , data) => api(`/tasks/${taskId}/assign`, {
        method: "PATCH",
        body : JSON.stringify(data)
    }),

    updateTaskStatus: (taskId , data) => api(`/tasks/${taskId}/status`, {
        method: "PATCH",
        body : JSON.stringify(data)
    }),

}

export default taskService;