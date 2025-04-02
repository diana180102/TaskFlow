"use client";
import { formatDate } from "@/app/helper/formateDate";
import { RootState } from "@/redux/store";
import { monserrat, archivo_black, lexen } from "@/ui/fonts";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import { searchUsers } from "@/services/searchService";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/users";
import Button from "../Button";
import { createProjectUser, deleteProjectUser, getProjectUsers } from "@/services/projectUserService";
import { getProjectById } from "@/services/projectService";
import { setProject } from "@/redux/projectSlice";
import { Role } from "@/enums/enum";

import { CirclePlus, CircleX } from "lucide-react";
import TaskList from "../TaskList";
import FormTask from "../FormTask";
import Image from "next/image";
import { ProjectsUser } from "@/types/projects";
import { colorStatus } from "@/app/helper/colorStatus";


interface ProjectDetailsProps {
    projectId: number; // Define el tipo de la prop
}


function ProjectDetails({projectId}:ProjectDetailsProps) {
   
    const dispatch = useDispatch();
    
   
   const projectDetails = useSelector((state: RootState) => state.project.projects.find((project) => project.id === projectId));
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResult, setSearchResult] = useState<User[]>([]);
   const [selectedUser, setSelectedUser] = useState<User>(); // Selected users
   const [isLoading, setIsLoading] = useState(false); // State for loading indicator"
   const [users, setUsers] = useState<User[]>([]);

   const color = colorStatus(projectDetails?.status ?? "");

 

 //Get project
   useEffect(() => {
    
    if (!projectDetails) {
      
      const fetchProject = async () => {
        try {
          const fetchedProject = await getProjectById(projectId); 
          if (fetchedProject) {
            
            dispatch(setProject(fetchedProject));
          }
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      };
       
        fetchProject();
       
    }
  }, [ projectDetails, projectId]);


  //Get Users

   const fetchUsers = async () => {
        try {
          setIsLoading(true);
          const fetchedUsers = await getProjectUsers(projectId);

          const usersData = fetchedUsers.map((item:ProjectsUser) => ({
            id: item.user.id,
            fullName: item.user.fullName,
            email: item.user.email,
            image: item.user.image,
            role: item.user.role,
            
            
          }));
          
         
          setUsers(usersData);

         
          
          
         
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error);
          setIsLoading(false);
        }
      };
    
    useEffect(() => {
     
      fetchUsers();
    }, [projectId]);

    useEffect(() => {}, [users]);
  


   

    
    function handleSearch(query: string) {
        setSearchQuery(query);
    }

    function handleAddUser(e: React.MouseEvent<HTMLButtonElement>, user: User) {
        e.preventDefault();
       setSelectedUser(user);
    }

    function handleDeleteUser(e: React.MouseEvent<HTMLButtonElement>, user: User) {
        e.preventDefault();
        
        const deleteUser = async () => {
            try{
              setIsLoading(true);
              await deleteProjectUser(projectId, user.id);
              fetchUsers();
            }
            catch (error) {
               console.error("Error finding user ",error);
            }
        }

        deleteUser();
    }

  

   useEffect(() => {
     
    if (!selectedUser) return;
    const fetchProjectUser = async () => {
      try {
        setIsLoading(true);
        
        await createProjectUser({ projectId, userId: selectedUser.id, role: Role.USER });
        //  fetchUsers();
         setSelectedUser(undefined);
        setIsLoading(false);
      } catch (error) {
        console.error("Error finding user ", error);
      }
    };
    fetchProjectUser();
  }, [selectedUser, projectId]);

  useEffect(() => {
   if (!isLoading) {
    fetchUsers();
  }
}, [selectedUser]); 

// Search user
      useEffect(() =>{
         setIsLoading(true);   
            if(searchQuery.trim() === ''){
              setSearchResult([]);
              return;
            }

           const fetchUser = async () =>{
              
              try {
                const data = await searchUsers(searchQuery);
                setSearchResult(data);
                

              } catch (error) {
                 console.error("Error finding user ",error);
              }
           }

           fetchUser();

        },[searchQuery]);

        if (!projectDetails) { 
            return <div>Project Loading</div>; 
        }
        const createdDate = formatDate(projectDetails?.createdAt);
    
    return ( 
    
      <section className="bg-[#f0fee0] flex flex-col  gap-4 rounded-lg shadow-md w-full max-w-[1500px] p-2" >
        <div className="project flex flex-col lg:flex-col gap-4 w-full ">
            {/* Details */}
            <div className="detailsProject shadow-lg p-4 bg-[#042940] rounded-lg flex flex-row gap-4 w-full justify-beetween items-start ">
                <div className="title flex flex-col justify-center gap-4">
                    <div className="">
                      <p className={`${lexen.className} font-bold text-3xl text-[#DBF227]`}>{projectDetails?.name}</p>
                      <p className=" text-sm text-[#dcddd6]">Created {createdDate}</p>
                    </div>
                    <p className={`${color} text-[#101214] ${lexen.className} font-medium text-center p-2 rounded text-xs w-[75%]`}>{projectDetails?.status}</p>
                </div>
                <p className={`text-[#dcddd6] ${lexen.className} font-light `}>Description: {projectDetails?.description}</p>
               
            </div>
            {/* Teams members */}
            <div className="team bg-[#042940] rounded-lg p-4 flex flex-col gap-4 w-full  ">
                <p className={`${lexen.className} font-bold text-2xl text-[#DBF227]`}>Team</p>
                 
                <div className="flex flex-col  w-full h-auto relative  ">
                <Search placeholder="Search member" onSearch={handleSearch}></Search>
                <div className="absolute top-10 w-full bg-[#042940] z-10 rounded-sm">
               {isLoading && 
                        ( 
                          searchResult.map((user:User) => ( 
                            <Button 
                                className=" flex gap-1 mt-[2px] bg-[#042940] text-white hover:bg-[#161a1d] shadow-lg text-sm text-start p-2  w-full " 
                                key={user.id} 
                                onClick={(e) => handleAddUser(e, user)}
                                > 
                                <CirclePlus className="text-[#13F287]" />
                                <p>{user.fullName || user.email}</p>
                                <p>{user.email}</p>
                                
                            
                            </Button>
                          ))
                        
                        )
                }
                </div>
                 </div>
                
               <ul className="flex flex-col gap-1 bg-[#005C53] rounded-lg p-2"> {
                  users.map((user:User) => ( 
                    <li className="flex flex-row justify-between items-center gap-2 p-2 bg-[#f0fee0] rounded-lg" key={user.id}>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <Image 
                          key={user.id}
                          width={40}
                          height={40}
                          src={ user.image || "/assets/images/profile.png"}
                          alt={"Profile photo"}
                          className="rounded-full"
                                         
                        ></Image>
                      <p className={`${lexen.className} font-semibold text-slate-800`}>{user.fullName}</p>
                      <span className={`text-xs text-gray-600 ${lexen.className}`}>{user.email}</span>
                    </div>
                    <Button onClick={(e) => handleDeleteUser(e, user)}>
                      <CircleX className="text-gray-100" />
                      </Button>
                    </li> 
                     ))
                   } 
               </ul>
                
            </div>
        </div>

        {/* List of tasks */}
        <div className="list-Task  bg-[#005C53] rounded-lg p-2 flex flex-col gap-4 w-full h-[736px]  shadow-md">
            <TaskList projectId={projectDetails.id}></TaskList>
        </div>
        <FormTask user={users} projectId={projectDetails.id} />
      </section>
    );
}

export default ProjectDetails;