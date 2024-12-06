"use client"
import Link from "next/link";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deletedProject } from "@/redux/projectSlice";
import { openModal } from "@/redux/modalSlice";
import { deleteProject } from "@/services/projectService";

function Dropdown({projectId}:{projectId:number}) {

    const nameProject = useSelector((state: RootState) =>
    state.project.projects.find((p) => p.id === projectId)
    );
    
   
    const dispatch = useDispatch();

    //Update project
    function handleOpenModal() {
    // dispatch(selectProject(Number(projectId)));
    dispatch(openModal("updateProject"));
   }
    
    //Delete project
   async  function handleDeleteProject (id:number) {
        dispatch(deletedProject(Number(id)));


        const fetch = async (id:number) => {
            
            try {
                await deleteProject(Number(id));
            } catch (error) {
                console.log("Error deleting project:", error);
            }
        }

        fetch(id);

    }
   
     
    return ( 
        <>
        
            <div className="dropdown w-[150px] bg-slate-100 flex flex-col rounded-md absolute top-10 right-0 shadow-lg ">
               <div className="menu-items flex flex-col items-center justify-center ">
                    <Link href={`/dashboard/projects/${nameProject?.id}`}  className="bg-slate-100 hover:bg-orange-300 text-center w-full text-xs p-1 " >View</Link>
                    <Button 
                        className="bg-slate-100 hover:bg-orange-300 w-full text-xs p-1 " 
                        onClick={handleOpenModal}>Edit 
                    </Button>
                    <Button 
                        
                        className="bg-slate-100 hover:bg-orange-300  w-full  text-xs p-1 "
                        onClick={() =>handleDeleteProject(Number(projectId))}>Delete </Button>
                </div> 
            </div>
            
       </> 
     );
}

export default Dropdown;