import { Task } from "@/types/tasks";
import { User } from "@/types/users";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { selectTask } from "@/redux/taskSlice";
import Image from "next/image";
import { lexen } from "@/ui/fonts";
import { colorPriority } from "@/app/helper/colorPriority";
import { colorStatusTask } from "@/app/helper/colorStatus";

interface TaskRowProps {
  taskItem: Task;

  users: User[];

  handleDeleteTask: (taskId: number) => Promise<void>;
}

function TaskRow({ taskItem, users, handleDeleteTask }: TaskRowProps) {
  const dispatch = useDispatch();

 const bgPriority = colorPriority(taskItem.priority); 
 const bgStatus = colorStatusTask(taskItem.status);

  function handleOpenModal(taskId: number) {
    dispatch(openModal("updateTask"));
    dispatch(selectTask(taskId));
  }

  return (
    <tr className={`bg-[#0d0b10] hover:bg-[#101214] ${lexen.className}`}>
      <th className={`px-6 py-4 font-medium text-[#f0fee0]`}>{taskItem.title}</th>
      <td className={`px-6 py-4 text-[#f0fee0] `}>
        <p className={`p-1 rounded-full text-center text-xs px-2 ${bgPriority}`}>{taskItem.priority}</p>
      </td>
      <td className={`px-6 py-4 text-[#f0fee0]`}>
        
        <p className={`p-1 rounded-full text-center text-xs px-2 ${bgStatus}`}>{taskItem.status}</p>
      </td>
      {
        <td className="px-6 py-4 flex items-center justify-center gap-2">
          {users && users.length > 0
            ? users.map((user) => (
               
                  <div key={user.id} className="w-[40px] h-[40px] border-[#B5FF57] border-2 rounded-full flex justify-center items-center ">
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
            className="text-black bg-[#13F287] p-2 rounded-lg "
          >
            Update
          </Button>
          <Button
            onClick={() => handleDeleteTask(taskItem.id)}
            className="text-black bg-[#e05b4c] p-2 rounded-lg"
          >
            Delete
          </Button>
      </div>
      </td>
    </tr>
  );
}

export default TaskRow;
