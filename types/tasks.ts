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
  assignedTo: number;      // Relación con el usuario asignado
  createdAt: Date;
  updatedAt: Date;
  user: User;              // Usuario asignado
  project: Project;        // Proyecto relacionado
}