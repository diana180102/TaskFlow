import { Search } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";

import { useEffect, useState } from "react";
import { Task, TaskUser } from "@/types/tasks";

import {  getTasks } from "@/services/taskService";

import { User } from "@/types/users";
import { getAllTaskUsers} from "@/services/taskUserService";
import TaskRow from "./TaskRow";
import { assignaTask } from "@/redux/taskSlice";


type UserMap = { [taskId: number]: User[] }

function TaskList({ projectId }: { projectId: number }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState<Task[]>([]);
  const [user, setUser] = useState<UserMap>({});
  const [isLoading, setIsLoading] = useState(false);
  
 

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);

      try {
        const data = await getTasks();
        const taskProject = data.tasks.filter(
          (task: Task) => task.projectId === projectId
        );
        setTask(taskProject);

        setIsLoading(false);
      } catch (error) {
        console.log("error in get tasks", error);
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);


  

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskUsers = await getAllTaskUsers();
      

        const userMap: UserMap = task.reduce((acc, taskItem) => {
          const users = taskUsers
            .filter((taskUser: TaskUser) => taskUser.taskId === taskItem.id)
            .map((taskUser: TaskUser) => ({
              id: taskUser.user.id, 
              fullName: taskUser.user.fullName, 
              email: taskUser.user.email
            }));
          
          acc[taskItem.id] = users;
          return acc;
        }, {} as UserMap);

       

        setUser(userMap); 
        dispatch(assignaTask(taskUsers));
      } catch (error) {
        console.log("error in get task users", error);
      }
    };

    fetchTask();
  }, [task]);





  return (
    <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg p-4 bg-slate-50">
      {/* search - header */}
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <Button
            className="inline-flex items-center text-white bg-gray-800 shadow-md border-gray-300 focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-gray-100 font-bold rounded-md text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => dispatch(openModal("createTask"))}
          >
            Add Task
          </Button>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"></div>
          <Input
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search tasks"
          />
        </div>
      </div>
      {/* table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task Name
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                AssignedTo
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {task.length > 0 ? (
              task.map((taskItem) => (
                <TaskRow
                  key={taskItem.id}
                  taskItem={taskItem}
                  users={user[taskItem.id] || []}
                />
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan={5}>
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TaskList;
