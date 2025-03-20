import { updateTask } from "@/services/taskService"
import { TaskUser } from "@/types/tasks"
import { Task } from "@prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


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
            
       },

       addTask(state, action: PayloadAction<Task>) {
        state.task?.push(action.payload);
       },

       updateTasks(state, action: PayloadAction<Task>) {
        let index = state.task?.findIndex(task => task.id === action.payload.id);
        if (index !== undefined && index !== -1) {
            state.task = state.task ?? []; // Provide a default value if state.task is null or undefined
            state.task[index] = action.payload;
        }
        },

        deleteTasks(state, action: PayloadAction<number>) {
        state.task = state.task?.filter(task => task.id !== action.payload);
       },


    }
});

export const {selectTask, assignaTask, setTask, addTask, deleteTasks, updateTasks} = taskSlice.actions;
export default taskSlice.reducer;

