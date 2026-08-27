import api from "./api.js";

const userService = {

    updateProfile : (data) => api("/users/update-profile" , {
        method : "PATCH",
        body : JSON.stringify(data)
    }) ,
    
    changePassword : (data) => api("/users/change-password" , {
        method : "PATCH",
        body : JSON.stringify(data)
    }),

    updateUserAvatar : (data) => api("/users/update-avatar" , {
        method : "PATCH",
        body : data    //FormData type
    }),

}

export default userService;