
import axios from "axios";

const apiTaskUsers = `/api/taskUser`;

export async function getTaskUsers(taskId:number) {
    try {
        const res = await axios.get(apiTaskUsers+`/${taskId}`);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in get task users:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}


export async function getAllTaskUsers(){
    try{
        const res = await axios.get(apiTaskUsers);
        return res.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("Error in get task users:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}