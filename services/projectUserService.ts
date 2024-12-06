import { ProjectsUser } from "@/types/projects";
import axios from "axios";


const apiProjectUser = "/api/projectUser";

export async function getProjectUsers(projectId: number) {

     try {
        const response = await axios.get(`${apiProjectUser}/${projectId}`);
        
        return response.data;
        
     } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in get Project User:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
     }
}



export async function createProjectUser(project: Partial<ProjectsUser> ) {
    try {
        
        const res = await axios.post(apiProjectUser, project);
        return res.data;

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in create Project User:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}
