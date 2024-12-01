import { Project } from "@/types/projects";
import axios from "axios";

const apiProjects = `/api/projects`;

export async function createProject(project:Partial<Project>){
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

export async function updateProject(project:Partial<Project>, id:number){
    try {
        const res = await axios.put(apiProjects+`/${id}`, project);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in update Project:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}

export async function deleteProject(id:number){
    try {
        const res = await axios.delete(apiProjects+`/${id}`);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Error in delete Project:", error.response?.data || error.message)
        }else{
            console.log("Error inesperado: ", error);
        }
    }
}



