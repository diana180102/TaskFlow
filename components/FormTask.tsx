"use client";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Modal from "./Modal";
import { RootState } from "@/redux/store";
import Button from "./Button";
import { closeModal } from "@/redux/modalSlice";
import {  useEffect, useState } from "react";
import { Priority, Status } from "@/enums/enum";
import { User } from "@/types/users";
import { createTask, getTaskById, updateTask } from "@/services/taskService";
import { X } from "lucide-react";
import { addTask, updateTasks } from "@/redux/taskSlice";



type ModalState = "updateTask" | "createTask" | null;

function FormTask({user, projectId}:{projectId:number, user:User[]}) {
    
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);
    const selectedTaskId = useSelector((state: RootState) => state.task.taskId);
    const assignedUsers = useSelector((state: RootState) => state.task.taskUser);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Partial<User>[]>([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: Priority.LOW,
        status: Status.PROGRESS,
        projectId: projectId,
        
        });



    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);

    };
     
     //search users 
     useEffect(() => {
        if (searchQuery) {
            const filteredUsers = user.filter((user) =>
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResult(filteredUsers);
        } else {
            setSearchResult([]);
        }
    }, [searchQuery, user]);

    





    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const taskData = {
            ...task,
            assignedUserIds: selectedUsers.map((user) => Number(user.id))
        };

        
        
        try {
            
            // create task
           if(isModalOpen === "createTask"){
              const res =  await createTask(taskData);
                    setTask({
                        title: "",
                        description: "",
                        priority: Priority.LOW,
                        status: Status.PROGRESS,
                        projectId: projectId,
                    });
                    dispatch(addTask(res));
            }else if(isModalOpen === "updateTask"){
                
                if (selectedTaskId !== undefined) {
                     await updateTask(taskData, selectedTaskId);
                }
            }

           
           

            setSelectedUsers([]);
            setSearchQuery("");
            setSearchResult([]);
            
        } catch (error) {
            console.log(error);
        }finally{
            dispatch(closeModal());
        }

       
    }


 useEffect(() => {
    if (isModalOpen === "updateTask" && selectedTaskId) {
      const loadTaskData = async () => {
        try {
          const taskData = await getTaskById(selectedTaskId, projectId);
          setTask({
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            status: taskData.status,
            projectId: taskData.projectId,
          });

          

        const taskFindUsers = assignedUsers
          .filter((task) => task.taskId === selectedTaskId)
          .map((task) => ({
            id: task.user.id,
            fullName: task.user.fullName,
            email: task.user.email,
            }));
          
          
           dispatch(updateTasks(taskData));

          setSelectedUsers(taskFindUsers);
        } catch (error) {
          console.log("Failed to load task data", error);
        }
      };

      loadTaskData();
    }else{
        setTask({
            title: "",
            description: "",
            priority: Priority.LOW,
            status: Status.PROGRESS,
            projectId: projectId,
        });
        setSelectedUsers([]);
    }
  }, [isModalOpen, selectedTaskId]);

    
    if (!isModalOpen) return null;
    
    
    return ( 
        <>
        
  {(isModalOpen === "createTask" || isModalOpen === "updateTask" ) && ( 
     <Modal>
         <form onSubmit={handleSubmit} className="relative">
         <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-[-40px] right-[-40px] bg-zinc-800 text-white rounded-full p-2 hover:bg-red-600 w-8 h-8 flex justify-center items-center"
        >
          X
        </button>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Task</label>
                        <Input  
                        name="title" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Name of task"
                        value={task.title} 
                        onChange={handleChange}
                        required /> 
                    </div>
                    
                   <div>
                        <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                        <select 
                        id="priority" 
                        name="priority"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={handleChange}
                        value={task.priority}>
                            <option>Select priority</option>
                            {
                                Object.values(Priority).map((priority) => (
                                    <option 
                                    className="" 
                                    key={priority} 
                                    value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}</option>
                                ))
                            }
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select
                         id="status" 
                         name="status"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         onChange={handleChange}
                         value={task.status}>
                            <option>Select status</option>
                            {
                                Object.values(Status).map((status) => (
                                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</option>
                                ))
                            }
                            
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">AssigneTo</label>
                         <Input
                         type="search"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                         placeholder="Assign to member project"
                         onChange={handleSearch}
                         />

                         <div className="flex flex-col">
                           {
                             searchResult.map((user) => (
                                 <div 
                                 key={user.id}
                                 onClick={() => setSelectedUsers([...selectedUsers, user])} >
                                     {user.fullName}

                                 </div>
                             ))
                           }
                         </div>

                         <div className="mt-2">
                            {
                                selectedUsers.map((user) => (
                                    <div key={user.id}className="flex flex-row gap-2 bg-gray-900 rounded-lg justify-between item-center px-2 py-1">
                                        <div className="flex gap-1 item-center justify-center">
                                            <p className="text-sm text-white">{user.fullName}</p>
                                             <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                       <Button onClick={() => setSelectedUsers(selectedUsers.filter((selected) => selected.id !== user.id))}><X className="text-orange-300" /></Button> 
                                    </div>

                                )) 
                            }
                         </div>
                            
                         
                        
                    </div>
                    
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea 
                        id="description" 
                        name= "description"
                        rows={4} 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Write task description"
                        onChange = {handleChange}
                        value={task.description}>
                            
                        </textarea>
                    </div>
                </div>
                <Button className="text-gray inline-flex items-center bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                   
                  {isModalOpen === "updateTask" ? "Update Task" : "Create Task"}
               </Button>
            </form>

            </Modal>)
       }
        </>
     );
}

export default FormTask;