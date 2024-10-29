import { User, UserRegister } from "@/types/users";
import axios from "axios";


const URL = `/api/users`;
export async function addUser(user:UserRegister){
  
   try {
    const response = await axios.post(URL, user);
    return response.data;

    
   } catch (error) {
       if(axios.isAxiosError(error)){
        console.log("Error add user:", error.response?.data || error.message);
       }else{
        console.log("Error inesperado: ", error);
       }
       throw error;
   }

}