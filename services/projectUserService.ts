import { ProjectsUser } from "@/types/projects";
import axios from "axios";

const apiProjectUser = "/api/projectUser";

async function getProjectUsers(projectId: number) {
    const response = await fetch(`${apiProjectUser}/${projectId}`);
    const data = await response.json();
    return data;
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