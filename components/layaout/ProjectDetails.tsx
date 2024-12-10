"use client";
import { formatDate } from "@/app/helper/formateDate";
import { RootState } from "@/redux/store";
import { monserrat, archivo_black } from "@/ui/fonts";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import { searchUsers } from "@/services/searchService";
import { use, useEffect, useState } from "react";
import { User } from "@/types/users";
import Button from "../Button";
import { createProjectUser, deleteProjectUser, getProjectUsers } from "@/services/projectUserService";
import { getProjectById } from "@/services/projectService";
import { setProject } from "@/redux/projectSlice";
import { Role } from "@/enums/enum";
import { set } from "date-fns";
import { ProjectsUser } from "@/types/projects";
import { CircleX } from "lucide-react";
import TaskList from "../TaskList";


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

          const usersData = fetchedUsers.map((item:any) => ({
            id: item.user.id,
            fullName: item.user.fullName,
            email: item.user.email,
            role: item.role
            
          }));
          
         
          setUsers(usersData);

          console.log("users", users);
          
          
          console.log("usersData", usersData  );
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
         fetchUsers();
        setIsLoading(false);
      } catch (error) {
        console.error("Error finding user ", error);
      }
    };
    fetchProjectUser();
  }, [selectedUser, projectId]);

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
    
      <section className="bg-zinc-50 flex flex-col  gap-4 rounded-lg shadow-md w-full max-w-[1500px] p-4" >
        <div className="project flex flex-col lg:flex-row gap-4 w-full ">
            {/* Details */}
            <div className="detailsProject shadow-lg p-4 bg-gray-200 rounded-lg flex flex-col gap-4 w-full lg:w-[30%] justify-center items-start ">
                <div className="title flex flex-col justify-center ">
                    <p className={`${archivo_black.className} font-bold text-3xl`}>{projectDetails?.name}</p>
                    <p className="text-gray-500 text-sm">{createdDate}</p>
                </div>
                <p className="">{projectDetails?.description}</p>
                <p className="bg-orange-700 text-white p-2 rounded text-xs">{projectDetails?.status}</p>
            </div>
            {/* Teams members */}
            <div className="team bg-gray-200 rounded-lg p-4 flex flex-col gap-4 w-full lg:w-[70%] shadow-md ">
                <p className={`${archivo_black.className} font-bold text-2xl`}>Team</p>
                 
                <div className="flex flex-col  w-full h-auto relative ">
                <Search placerholder="Search member" onSearch={handleSearch}></Search>
                <div className="absolute top-10 w-full bg-white z-10">
               {isLoading && 
                        ( 
                          searchResult.map((user:User) => ( 
                            <Button 
                                className="bg-gray-100 hover:bg-gray-300  shadow-lg text-sm text-start p-2  w-full " 
                                key={user.id} 
                                onClick={(e) => handleAddUser(e, user)}
                                > {user.fullName || user.email}
                            
                            </Button>
                          ))
                        
                        )
                }
                </div>
                 </div>
                
               <ul className="flex flex-col gap-2 bg-slate-50 rounded-lg p-4"> {
                  users.map((user) => ( 
                    <li className="flex flex-row justify-between items-center gap-2 p-2 bg-orange-300 rounded-lg" key={user.id}>
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <p className={`${monserrat.style} font-extrabold text-slate-800`}>{user.fullName}</p>
                      <span className="text-xs text-gray-600">{user.email}</span>
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
        <div className="list-Task bg-orange-500 rounded-lg p-4 flex flex-col gap-4 w-full  shadow-md">
            <TaskList></TaskList>
        </div>
      </section>
    );
}

export default ProjectDetails;