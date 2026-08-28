import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignedTasks : [],
}

const taskSlice = createSlice({
    name : "tasks",
    initialState,
    reducers : {
        setAssignedTasks : (state,action) => {
            state.assignedTasks = action.payload
        }
    }
})


export const {setAssignedTasks} = taskSlice.actions;

export default taskSlice.reducer