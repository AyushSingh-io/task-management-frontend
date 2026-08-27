import api from "./api.js"

const projectMemberService = {

    addProjectMember: (projectId, memberId) => api(`/projects/${projectId}/members/${memberId}`, {
        method: "POST"
    }),

    getAllProjectMembers: (projectId) => api(`/projects/${projectId}/members`),

    getProjectMember: (projectId, memberId) => api(`/projects/${projectId}/members/${memberId}`),

    changeProjectMemberRole: (projectId, memberId, data) => api(`/projects/${projectId}/members/${memberId}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    }),

    removeProjectMember: (projectId, memberId) => api(`/projects/${projectId}/members/${memberId}`, {
        method: "DELETE"
    }),

}

export default projectMemberService;