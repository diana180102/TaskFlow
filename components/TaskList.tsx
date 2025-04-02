
import Button from "./Button";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlice";

import { use, useEffect, useState } from "react";
import { Task, TaskUser } from "@/types/tasks";

import { deleteTask, getTasks } from "@/services/taskService";

import { User } from "@/types/users";
import { getAllTaskUsers } from "@/services/taskUserService";
import TaskRow from "./TaskRow";
import { assignaTask, deleteTasks, setTask } from "@/redux/taskSlice";
import Pagination from "./Pagination";
import { RootState } from "@/redux/store";
import { lexen } from "@/ui/fonts";

type UserMap = { [taskId: number]: User[] };

function TaskList({ projectId }: { projectId: number }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.task) || [];
  const [user, setUser] = useState<UserMap>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Get Task Users
  useEffect(() => {
    fetchTasks();
  }, [projectId, currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const data = await getTasks();
      const taskProject = data.tasks
        .filter((task: Task) => task.projectId === projectId)
        .map((task: Task) => ({
          ...task,
          user: task.user || null, 
          project: task.project || null, 
        }));

      let filteredTasks = taskProject;
      if (searchTerm) {
        filteredTasks = taskProject.filter((taskItem: Task) =>
          taskItem.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const totalTasks = filteredTasks.length;
      setTotalPages(Math.ceil(totalTasks / pageSize));
      const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );

      dispatch(setTask(paginatedTasks));
      setIsLoading(false);
    } catch (error) {
      console.log("error in get tasks", error);
      setIsLoading(false);
    }
  };

  //Fech Task Users
  const fetchTaskUser = async () => {
    try {
      const taskUsers = await getAllTaskUsers();

      if (tasks) {
        const userMap: UserMap = tasks.reduce((acc, taskItem) => {
          const users = taskUsers
            .filter((taskUser: TaskUser) => taskUser.taskId === taskItem.id)
            .map((taskUser: TaskUser) => ({
              id: taskUser.user.id,
              fullName: taskUser.user.fullName,
              email: taskUser.user.email,
              image: taskUser.user.image
            }));

          acc[taskItem.id] = users;
          return acc;
        }, {} as UserMap);

        setUser(userMap);
        dispatch(assignaTask(taskUsers));
      } else {
        console.log("No tasks found");
      }
    } catch (error) {
      console.log("error in get task users", error);
    }
  };

  useEffect(() => {
    fetchTaskUser();
  }, [tasks]);


  // Delete Task
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      dispatch(deleteTasks(taskId));
      fetchTasks();
    } catch (error) {
      console.log("error in delete task", error);
    }
  };

  return (
    <div className=" flex flex-col justify-between relative overflow-x-auto drop-shadow-lg sm:rounded-lg p-4 bg-[#042940] h-[704px]">
      {/* search - header */}

      <div>
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <Button
            className={`inline-flex items-center text-black bg-[#DBF227] hover:bg-[#B5FF57] shadow-md border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-bold rounded-md text-sm px-3 py-1.5 `}
            onClick={() => dispatch(openModal("createTask"))}
          >
            Add Task
          </Button>

          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"></div>
            <Input
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#B5FF57] focus:border-[#B5FF57]"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* table */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-[#D6D58E] bg-[#005C53] rounded-sm ">
              <tr className={`${lexen.className}`}>
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
              {tasks?.length > 0 ? (
                tasks.map((taskItem) => (
                  <TaskRow
                    key={taskItem.id}
                    handleDeleteTask={handleDeleteTask}
                    taskItem={taskItem}
                    users={user[taskItem.id] || []}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default TaskList;
