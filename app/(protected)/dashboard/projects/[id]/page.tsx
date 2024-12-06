import DashboardLayaout from "@/components/layaout/dashboardLayaout";
import ProjectDetails from "@/components/layaout/ProjectDetails";
import { useParams } from "next/navigation";

interface ProjectDetailsProps {
    params: { id: string };
}





 async function ProjectDetailsPage({params}:ProjectDetailsProps ) {
   const {id} =  await params
   const projectId = Number(id); 
   if (isNaN(projectId)) { 
    return <div>Invalid project ID</div>; 
    }
     
     return ( 

        <DashboardLayaout>
            <ProjectDetails projectId={projectId}></ProjectDetails>
        </DashboardLayaout>

     );
        
}

export default ProjectDetailsPage;