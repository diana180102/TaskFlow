import Link from "next/link";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectProject } from "@/redux/projectSlice";
import { openModal } from "@/redux/modalSlice";

function Dropdown({projectId}:{projectId:number}) {
    
   
    const dispatch = useDispatch();
    function handleOpenModal() {
    dispatch(selectProject(Number(projectId)));
    dispatch(openModal("updateProject"));
   }
   
    
    return ( 
        <>
        
            <div className="dropdown w-[150px] bg-slate-100 flex flex-col rounded-md absolute top-10 right-0 shadow-lg ">
               <div className="menu-items flex flex-col items-center justify-center ">
                    <Link href={`/`}  className="bg-slate-100 hover:bg-orange-300 text-center w-full text-xs p-1 " >View</Link>
                    <Button key={projectId} 
                        className="bg-slate-100 hover:bg-orange-300 w-full text-xs p-1 " 
                        onClick={handleOpenModal}>Edit 
                    </Button>
                    <Button className="bg-slate-100 hover:bg-orange-300  w-full  text-xs p-1 ">Delete </Button>
                </div> 
            </div>
            
       </> 
     );
}

export default Dropdown;