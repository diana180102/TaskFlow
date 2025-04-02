"use client";
import { ClipboardList, FolderTree } from "lucide-react";
import DonutChart from "./DonurtChart";
import { archivo_black, lexen } from "@/ui/fonts";
import { use, useEffect, useState } from "react";
import { getProjectUser } from "@/services/projectUserService";
import { ProjectsUser } from "@/types/projects";
import { useSession } from "next-auth/react";
import { getAllTaskUsers } from "@/services/taskUserService";
import { TaskUser } from "@/types/tasks";
import { faLess } from "@fortawesome/free-brands-svg-icons";


function Overview() {

    const { data: session} = useSession();
    const [projectUsers, setProjectUsers] = useState<ProjectsUser[]>([]);
    const [taskUsers, setTaskUsers] = useState<TaskUser[]>([]);
    const [stateProyects, setStateProjects] = useState({
        ESTABLISHED: 0,
        PROGRESS: 0,
        COMPLETED: 0,  
    }); 

    const [taskStatus, setTaskStatus] = useState({
        PENDING: 0,
        PROGRESS: 0,
        COMPLETED: 0
    });
  
   const fetchProjectUsers = async () => {
      try {
            const projectUsers = await getProjectUser();
            
            const projectUsersData = projectUsers.project_users.filter((projectUser: ProjectsUser) => projectUser.user.email === session?.user?.email);
                                        
            setProjectUsers(projectUsersData);  
            

      } catch (error) {
          console.log("Error in fetch project users:", error);
        
      }
  };

  const fetchTaskUsers = async () => {
    try {
          const taskUsers = await getAllTaskUsers();
          const taskUsersData = taskUsers.filter((taskUser:TaskUser) => taskUser.user.email === session?.user?.email);
          setTaskUsers(taskUsersData);
         
    } catch (error) {
        console.log("Error in fetch task users:", error);
      
    }
  }

    useEffect(() => {
        fetchTaskUsers();  
    }, [session]);
   

   useEffect(() => {
       fetchProjectUsers();
   }, [session]);


   useEffect(() => {
    const newStateProjects = {
      ESTABLISHED: 0,
      PROGRESS: 0,
      COMPLETED: 0,
    };
 

    projectUsers.forEach((projectUser) => {
      if (projectUser.projects.status === "ESTABLISHED") {
        newStateProjects.ESTABLISHED += 1;
      } else if (projectUser.projects.status === "PROGRESS") {
        newStateProjects.PROGRESS += 1;
      } else if (projectUser.projects.status === "COMPLETED") {
        newStateProjects.COMPLETED += 1;
      }
    });

    setStateProjects(newStateProjects);
  }, [projectUsers]);


  useEffect(() => {
    const newTaskStatus = {
      PENDING: 0,
      PROGRESS: 0,
      COMPLETED: 0,
    };
 
    taskUsers.forEach((taskUser) => {
      if (taskUser.task.status === "PENDING") {
        newTaskStatus.PENDING += 1;
      } else if (taskUser.task.status === "PROGRESS") {
        newTaskStatus.PROGRESS += 1;
      } else if (taskUser.task.status === "COMPLETED") {
        newTaskStatus.COMPLETED += 1;
      }
    });

    setTaskStatus(newTaskStatus);
  }, [taskUsers]);

    useEffect(() => {
    
  }, [taskStatus]);

 

    


    
    return ( 
      <section className=" w-full max-w-[1500px] rounded-md shadow-sm flex flex-col gap-8 items-center ">
        <div className="header bg-[#042940] p-4 flex justify-start rounded-lg shadow-md w-full">
          <h2
            className={` text-4xl font-bold m-4 tracking-wider text-white  ${lexen.className}`}
          >
            DASHBOARD
          </h2>
        </div>

        <div className="bg-[#042940] w-full rounded-md shadow-sm flex flex-col items-center justify-center">
          {/* Totales */}
          <div className="total flex flex-col md:flex-row gap-12 mt-8 w-[80%] justify-around ">
            <div className={`card w-[280px] h-[170px] pt-2 flex flex-row justify-center items-center gap-2 bg-[#f0fee0] ${lexen.className} rounded-2xl`}>
              <div className="details w-full flex flex-row justify-around items-start relative ">
                <div className="title flex flex-col items-start gap-2 w-full">
                  <h4 className="text-[#1e1f1f] font-semibold text-2xl md:text-lg text-center">
                   
                    Total Tasks
                  </h4>
                   <p className="text-6xl text-center font-bold text-[#1e1f1f]  ">
                    {taskUsers.length}
                  </p>
                 
                  
                </div>
                <div className=" absolute top-0 right-0 bg-[#005C53] rounded-full p-2" >
                   <ClipboardList
                    className="text-center text-white"
                    size={35}
                  />
                </div>
              </div>
            </div>
            <div className={`card w-[280px] h-[170px] pt-2 flex flex-row justify-center items-center gap-2 bg-[#f0fee0] ${lexen.className} rounded-2xl`}>
              <div className="details w-full flex flex-row justify-around items-start relative ">
                <div className="title flex flex-col items-start gap-2 w-full">
                  <h4 className="text-[#1e1f1f] font-semibold text-2xl md:text-lg text-center">
                   
                     Total Projects
                  </h4>
                   <p className="text-6xl text-center font-bold text-[#1e1f1f]  ">
                    {projectUsers.length}
                  </p>
                 
                  
                </div>
                <div className=" absolute top-0 right-0 bg-[#005C53] rounded-full p-2" >
                  <FolderTree
                    className="text-center text-white"
                    size={35}
                  />
                </div>
              </div>
            </div>
            
          </div>
         
          <div className="Projects flex flex-col  flex-wrap justify-center md:flex-row items-center md:items-start  gap-44  py-8">
            {/* Projects */}
           
            <div className="card flex flex-col justify-center  items-center w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#f0fee0] drop-shadow-xl">
              <h2 className={`text-[#101214] tracking-wide mb-4 font-bold text-xl ${lexen.className}`}>
                Distribución Porcentual del Estado de Proyectos
              </h2>
              {
                stateProyects && (
                  <DonutChart
                    pending={stateProyects.ESTABLISHED}
                    progress={stateProyects.PROGRESS}
                    completed={stateProyects.COMPLETED}
                  />
                )
              }
              
            </div>

             {/* Task */}

             <div className="card flex flex-col justify-center items-center  w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#f0fee0] drop-shadow-xl">
              <h2 className={`text-[#101214] tracking-wide mb-4 font-bold text-xl ${lexen.className}`}>
                Distribución Porcentual del Estado de Proyectos
              </h2>
              {
                taskStatus && (
                  <DonutChart
                    pending={taskStatus.PENDING}
                    progress={taskStatus.PROGRESS}
                    completed={taskStatus.COMPLETED}
                  />
                )
              }
            </div>
           
          </div>
         
          <div className="Projects flex flex-col  md:flex-row items-center md:items-start  gap-8  py-8">
           
           
          </div>
        </div>
      </section>
     );
}

export default Overview;