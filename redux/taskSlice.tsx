import { TaskUser } from "@/types/tasks"
import { Task } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { set } from "date-fns"

interface TaskState {
    taskId?: number
    taskUser: TaskUser[]
    task?: Task[]
}

const initialState: TaskState = {
    taskId: 0,
    taskUser:[],
    task: []
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
            
        },

        setTask: (state, action: PayloadAction<Task[]>) => {
            state.task = action.payload;
     }
    }
})

export const {selectTask, assignaTask, setTask} = taskSlice.actions;
export default taskSlice.reducer;

