import api from "./api.js"

const taskService = {
    createTask: (projectId , data) => api(`/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify(data)
    }),

    getProjectTasks: (projectId) => api(`/projects/${projectId}/tasks`),

    getAssignedTasks: () => api("/tasks"),

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