import { Task } from "@/types/tasks";
import { User } from "@/types/users";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { selectTask } from "@/redux/taskSlice";

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
        <td className="px-6 py-4">
          {users && users.length > 0
            ? users.map((user) => (
                <div key={user.id}>
                  <p>{user.fullName}</p>
                </div>
              ))
            : "No users assigned"}
        </td>
      }
      <td className="px-6 py-4 flex flex-row gap-1">
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
      </td>
    </tr>
  );
}

export default TaskRow;
