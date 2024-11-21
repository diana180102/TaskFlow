"use client"

import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Modal from "./Modal";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import Button from "./Button";
import React, { ChangeEvent, use, useEffect, useId, useState } from "react";
import { searchUsers } from "@/services/searchService";
import { User } from "@/types/users";
import { useSession } from "next-auth/react";
import { getUser } from "@/services/userService";
import { createProject } from "@/services/projectService";
import { Project } from "@/types/projects";

import { Status_project, Role } from "@/enums/enum";
import { createProjectUser } from "@/services/projectUserService";


function CreateProject() {

    
    const [formData, setFormData] = useState({
      name: "",
      description: "",
    }); 

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<User[]>([]); // Result of search
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Selected users
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator"

     
    const {data:session} = useSession();  // data of session

 

     // Function to handle input changes
     function handleChange (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
        const {name, value} = e.target;
        setFormData((prevData ) =>({
          ...prevData,
          [name]: value
        }));
     }

     // Function to handle input changes Search
     function handleChangeSearch( e:  ChangeEvent<HTMLInputElement> ){
        const query = e.target.value;
        setSearchQuery(query);
        
      }
      
     // Function to handle form submission  
     async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        setIsLoading(true);

         try {
            

            const projectData: Partial<Project> = {
              ...formData,
            };

            const project = await createProject(projectData);

            const emailUser = session?.user?.email;
            console.log(emailUser);

            if(emailUser){
              const existingUser = await getUser(emailUser);
              
              if(existingUser){
                const creatorProject = {
                  projectId: project.id,
                  userId: existingUser.id,
                  role: Role.ADMIN,
                }

                await createProjectUser(creatorProject);
            }else{
              console.warn("User not found");
            }
          }


            const userAdd = selectedUsers.map((user) => {
                return createProjectUser({
                  userId: user.id,
                  projectId: project.id,
                  role: Role.USER,
                });
              });

           await Promise.all(userAdd);

           setFormData({ name: "", description: "" });
            setSelectedUsers([]);
            setSearchQuery("");
            setSearchResult([]);
         } catch (error) {
           console.error("Error al crear el proyecto:", error);
         } finally {
          setIsLoading(false); 
          dispatch(closeModal()); 
         }
        
      }

    // Function for Add User to project
    function handleAddUser(e: React.MouseEvent<HTMLButtonElement>, user: User){
        e.preventDefault();
         e.stopPropagation();

        if(!selectedUsers.find(selected => selected.id === user.id)){
           setSelectedUsers((prev) => [...prev, user]);
        }

       
    }
    
    // Function for Remove User to project
    function handleRemoveUser(e: React.MouseEvent<HTMLButtonElement>, user: User){
       e.preventDefault();
        e.stopPropagation();
        setSelectedUsers((prev) => prev.filter((selected) => selected.id !== user.id));
    }

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
                console.log("data",data);

              } catch (error) {
                 console.error("Error finding user ",error);
              }
           }

           fetchUser();

        },[searchQuery]);

   

    
    
    const isModelOpen = useSelector((state:RootState) => state.modal.isModalOpen);  // State for the modal
    const dispatch = useDispatch();

    if(!isModelOpen) return null;


    return (
      <Modal>
         <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        >
          X
        </button>
       <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title project</label>
            <Input className="" 
               value={formData.name}
               name="name"
               onChange={handleChange}></Input>
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe project</label>
            <textarea
                placeholder="Write your thoughts here..."
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="description"
                value={formData.description}
                onChange={handleChange}
            ></textarea>
          </div>


        <div>
            <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invite Members</label>
           <Input name="users"  onChange={handleChangeSearch} ></Input>
          <div className="flex flex-col mt-2">
           {isLoading && (
            searchResult.map(user => (
              <Button className="bg-gray-100 hover:bg-gray-300 rounded-sm text-sm text-start p-2 " key={user.id} onClick={(e) => handleAddUser(e, user)} >{user.fullName || user.email } <span className="text-xs text-slate-600">{user.email}</span>  </Button>
            ))
           )}
           </div>
          </div>

            <div className="flex flex-row gap-2 flex-flex-wrap text-xs  ">
              {selectedUsers.map(user => (
                <Button onClick={(e) => handleRemoveUser(e, user)} key={user.id} className="bg-slate-400 hover:bg-slate-700 text-zinc-100 p-2 rounded-xl">
                    {user.fullName || user.email}
                </Button>
              ))}
          </div>


          <Button  className="bg-orange-600 text-gray-100 p-2 rounded-md">Create Project</Button>
          

       </form>
      </Modal>
    );
}

export default CreateProject;