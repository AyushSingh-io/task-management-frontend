import api from "./api.js"

const commentService = {

    addCommentToTask: (taskId, data) => api(`/comments/tasks/${taskId}`, {
        method: "POST",
        body: JSON.stringify(data)
    }),

    getAllComments: (taskId) => api(`/comments/tasks/${taskId}`),

    updateComment: (commentId, data) => api(`/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    }),

    deleteComment: (commentId) => api(`/comments/${commentId}`, {
        method: "DELETE"
    })

}

export default commentService;