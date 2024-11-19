import { Role, Status_project } from "@/enums/enum"
import { User } from "./users"
import { Task } from "./tasks";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: Status_project; // Enum que representa los estados (e.g., ESTABLISHED, IN_PROGRESS, etc.)
  createdAt: Date;
  updatedAt: Date;
  projects: ProjectsUser[]; // Relación con Projects_users
  tasks: Task[];           // Relación con las tareas
}

export interface ProjectsUser{
  userId:    Number
  projectId: Number
  role: Role
  joinedAt: Date
  projects: Project
  user: User
}