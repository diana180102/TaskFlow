"use client";

import Button from "@/components/Button";
import { openModal } from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../ProjectCard";
import CreateProject from "../FormCreateProject";
import { useEffect, useState } from "react";

import { getProjects, updateProject } from "@/services/projectService";
import { Project } from "@/types/projects";
import { Status_project } from "@/enums/enum";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { addProject, selectProject, setProject, setProjects } from "@/redux/projectSlice";
import { RootState } from "@/redux/store";
import { archivo_black } from "@/ui/fonts";

function Projects() {
  type DroppableId = "ESTABLISHED" | "PROGRESS" | "COMPLETED";

  const dispatch = useDispatch();

  //Get projects
  const projects = useSelector((state: RootState) => state.project.projects);
  const [isLoading, setIsLoading] = useState(false);

  const columns = {
    ESTABLISHED: { name: "Working", projects: [] as Project[] },
    PROGRESS: { name: "In progress", projects: [] as Project[] },
    COMPLETED: { name: "Completed", projects: [] as Project[] },
  };

  projects.forEach((project: Project) => {
    const column = columns[project.status as DroppableId];
    
        column.projects.push(project);
  });

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      try {
        const dataProjects = await getProjects();
        dispatch(setProjects(dataProjects.projects));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [dispatch]);

  const onDragEnd = async (result: DropResult<DroppableId>) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId as DroppableId]; //Column Origin
    const destinationColumn = columns[destination.droppableId as DroppableId]; //Column Destination

    //Create copys of the projects
    const sourceProjects = [...(sourceColumn.projects as Project[])];
    const destinationProjects = [...(destinationColumn.projects as Project[])];

    //Move projects between columns
    const [removed] = sourceProjects.splice(source.index, 1);
    destinationProjects.splice(destination.index, 0, removed);

    //Clone the object removed
    const updatedProject = {
      ...removed,
      status: destination.droppableId as Status_project,
    };

    try {
      await updateProject(updatedProject, updatedProject.id!);
      dispatch(setProject(updatedProject));
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  return (
    <section className="w-full max-w-[1500px] flex flex-col gap-8">
      <div className="header bg-zinc-50 p-6 flex justify-between rounded-lg shadow-md">
        <h2
          className={`text-4xl font-extrabold m-4  tracking-wider text-orange-600  ${archivo_black.className}`}
        >
          PROJECTS
        </h2>
        <Button
          className="bg-orange-500 p-4 rounded-md font-semibold text-gray-100 "
          onClick={() => dispatch(openModal("createProject"))}
        >
          Create Project
        </Button>
        
      </div>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder<string>}>
          <div className="to-do bg-zinc-50 flex flex-col lg:flex-row gap-4 rounded-lg shadow-md ">
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    className="lg:w-[33%] flex flex-col gap-4 m-4 h-auto border shadow-md border-zinc-300 rounded-md p-4 "
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="title border-b border-orange-400 p-1 ">
                      <h4 className="text-orange-400 font-semibold ">
                        {column.name}
                      </h4>
                    </div>

                    {column.projects.length === 0 ? (
                      <div className="h-[100px] m-auto">
                        <p className="text-center text-lg text-zinc-400">
                          No projects
                        </p>
                      </div>
                    ) : (
                      column.projects.map((project: Project, index) => (
                        <Draggable
                          key={project.id}
                          draggableId={project.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ProjectCard
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                description={project.description}
                                status={project.status}
                                createdAt={project.createdAt}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
      <CreateProject />
    </section>
  );
}

export default Projects;
