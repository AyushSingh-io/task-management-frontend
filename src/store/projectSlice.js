import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    projects: [],
    currentProject: null
}


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {

        setProjects: (state, action) => {
            state.projects = action.payload;
            
            if (
                state.currentProject &&
                !state.projects.some(
                    project => project._id === state.currentProject._id
                )
            ) {
                state.currentProject = null;
            }
        },

        addProject: (state, action) => {
            state.projects.push(action.payload)
        },

        updateProject: (state, action) => {
            const { projectId, updatedProject } = action.payload;

            state.projects = state.projects.map((project) => {
                if (project._id === projectId) {
                    return updatedProject
                }
                return project
            })

            if (projectId === state.currentProject?._id) {
                state.currentProject = updatedProject;
            }
        },

        removeProject: (state, action) => {
            const { projectId } = action.payload
            state.projects = state.projects.filter((project) => (project._id !== projectId))

            if (state.currentProject?._id === projectId) {
                state.currentProject = null;
            }
        },

        setCurrentProject: (state, action) => {
            state.currentProject = action.payload
        },

        clearCurrentProject: (state) => {
            state.currentProject = null;
        },
    }
})


export const {
    setProjects,
    addProject,
    removeProject,
    updateProject,
    clearCurrentProject,
    setCurrentProject,
} = projectSlice.actions;

export default projectSlice.reducer

