
import { Project } from "@/types/projects";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState { 
    projects: Project[]; 
    selectedProjectId?: number; }

const initialState: ProjectState = { 
    projects: []
 }

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action:PayloadAction <Partial<Project>>) => {
           const updatedProject = action.payload; 
           const index = state.projects.findIndex(p => p.id === updatedProject.id);

           if (index !== -1) {
            state.projects[index] = { ...state.projects[index], ...updatedProject };
           } else{
            state.projects.push(updatedProject as Project);
           }
             
        },
        selectProject: (state, action: PayloadAction<number>) => { 
            state.selectedProjectId = action.payload; 

        },

        setProjects: (state, action: PayloadAction<Project[]>) => { 
            state.projects = action.payload; 
        },

        addProject(state, action: PayloadAction<Project>) {
        state.projects.push(action.payload);
        },

        deletedProject: (state, action: PayloadAction<number>) => { 
            state.projects = state.projects.filter(p => p.id !== action.payload); 
        }


       
    }
});


//actions
export const {setProject, selectProject, setProjects, deletedProject, addProject} = projectSlice.actions;
export default projectSlice.reducer;