import { Task } from "@/types/tasks";
import axios from "axios";

const apiTasks = `/api/tasks`;

export async function getTasks() {
    try {
        const res = await axios.get(apiTasks);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in get tasks:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}

export async function getTaskById(id:number, projectId:number){
    try {
        const res = await axios.get(apiTasks+`/${id}`, {
            data: {
                projectId
            }
        });
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
        console.log("Error get task:", error.response?.data || error.message);
       }else{
        console.log("Error inesperado: ", error);
       }
       throw error;
    }
    
}

export async function createTask(task:Partial<Task>){
    try {
        const res = await axios.post(apiTasks, task);
        return res.data;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log("Error create task:", error.response?.data || error.message);
       }else{
        console.log("Error inesperado: ", error);
       }
       throw error;
    }
}


export async function updateTask(task:Partial<Task>, id:number){
    try {
        const res = await axios.put(apiTasks+`/${id}`, task);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in update task:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}

export async function deleteTask(id:number){  
    try {
        const res = await axios.delete(apiTasks+`/${id}`);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in delete task:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
 } 