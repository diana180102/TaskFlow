import { Priority, Status } from "@/enums/enum";
import { User } from "./users";
import { Project } from "./projects";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;          // Enum que representa los estados (e.g., PROGRESS, COMPLETED, etc.)
  priority: Priority;      // Enum que representa las prioridades (e.g., LOW, MEDIUM, HIGH, etc.)
  projectId: number;       // Relación con el proyecto
  createdAt: Date;
  updatedAt: Date;
  user: User;              // Usuario asignado
  project: Project;        // Proyecto relacionado
}

export interface TaskUser {
  taskId: number;
  userId: number;
  user: User;
  task: Task;
  }