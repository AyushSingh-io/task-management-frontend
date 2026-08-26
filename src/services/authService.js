import api from "./api.js"

const authService = {
    register: (data) => api("/users/register", {
        method: "POST",
        body: data   //FormData type
    }),

    login: (data) => api("/users/login" , {
        method : "POST",
        body : JSON.stringify(data)  //normal data
    }) ,

    logout: () => api("/users/logout" , {
        method : "POST",
    }),

    refreshAccessToken: () => api("/users/refresh-token" , {
        method : "POST",
    }),

    getCurrentUser: () => api("/users/me"),

}

export default authService;