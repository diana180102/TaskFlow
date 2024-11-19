import { Project } from "@/types/projects";
import axios from "axios";

const apiProjects = `/api/projects`;

export async function createProject(project:Project){
    try {
        const res = await axios.post(apiProjects, project);
        return res.data;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log("Error create project:", error.response?.data || error.message);
       }else{
        console.log("Error inesperado: ", error);
       }
       throw error;
    }
}

export async function getProjects() {
    try {
        const res = await axios.get(apiProjects);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in get Project:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}

