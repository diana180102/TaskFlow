import { Task } from "@/types/tasks";
import { User } from "@/types/users";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { selectTask } from "@/redux/taskSlice";
import Image from "next/image";

interface TaskRowProps {
  taskItem: Task;

  users: User[];

  handleDeleteTask: (taskId: number) => Promise<void>;
}

function TaskRow({ taskItem, users, handleDeleteTask }: TaskRowProps) {
  const dispatch = useDispatch();

 

  function handleOpenModal(taskId: number) {
    dispatch(openModal("updateTask"));
    dispatch(selectTask(taskId));
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th className="px-6 py-4 font-medium text-gray-900">{taskItem.title}</th>
      <td className="px-6 py-4">{taskItem.priority}</td>
      <td className="px-6 py-4">{taskItem.status}</td>
      {
        <td className="px-6 py-4 flex items-center">
          {users && users.length > 0
            ? users.map((user) => (
               
                  <div key={user.id} className="border w-[40px] h-[40px] border-orange-500 rounded-full flex justify-center items-center ">
                    <Image 
                      
                      width={40}
                      height={40}
                      src={ user.image || "/assets/images/profile.png"}
                      alt={"Profile photo"}
                      className="rounded-full"
                    
                    ></Image>
                  </div>
                
              ))
            : "No users assigned"}
        </td>
      }
      <td className="px-6 py-4 ">
      <div className="flex gap-2">
          <Button
            onClick={() => handleOpenModal(taskItem.id)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteTask(taskItem.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </Button>
      </div>
      </td>
    </tr>
  );
}

export default TaskRow;
