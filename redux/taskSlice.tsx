import { TaskUser } from "@/types/tasks"
import { Task } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface TaskState {
    taskId?: number
    taskUser: TaskUser[]
}

const initialState: TaskState = {
    taskId: 0,
    taskUser:[]
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        
        selectTask: (state, action :PayloadAction<number>) => {
            state.taskId = action.payload;
           
        },

        assignaTask: (state, action :PayloadAction<TaskUser[]>) => {
            state.taskUser = action.payload;
            
        }
    }
})

export const {selectTask, assignaTask} = taskSlice.actions;
export default taskSlice.reducer;

