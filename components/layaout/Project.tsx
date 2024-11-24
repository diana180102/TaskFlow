"use client";

import Button from "@/components/Button";
import { openModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import ProjectCard from "../ProjectCard";
import CreateProject from "../FormCreateProject";
import { useEffect, useState } from "react";

import { getProjects, updateProject } from "@/services/projectService";
import { Project } from "@/types/projects";
import { Status_project } from "@/enums/enum";
import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from "@hello-pangea/dnd";



function Projects() {
 
  type DroppableId = "ESTABLISHED" | "PROGRESS" | "COMPLETED"
  

  const dispatch = useDispatch();

  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    columns: {
      ESTABLISHED: { name: "Working", projects: [] },
      PROGRESS: { name: "In progress", projects: [] },
      COMPLETED: { name: "Completed", projects: [] },
    },
  });

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      try {
        const dataProjects = await getProjects();

        // setProjects(dataProjects.projects);
        setData({
          columns: {
            ESTABLISHED: {
              name: "Working",
              projects: dataProjects.projects.filter(
                (project: Project) =>
                  project.status === Status_project.ESTABLISHED
              ),
            },
            PROGRESS: {
              name: "In progress",
              projects: dataProjects.projects.filter(
                (project: Project) => project.status === Status_project.PROGRESS
              ),
            },
            COMPLETED: {
              name: "Completed",
              projects: dataProjects.projects.filter(
                (project: Project) =>
                  project.status === Status_project.COMPLETED
              ),
            },
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const onDragEnd = async (result: DropResult<DroppableId>) => {
    if (!result.destination) return;

    const { source, destination } = result;
     
    const sourceColumn = data.columns[source.droppableId as DroppableId];  //Column Origin
    const destinationColumn = data.columns[destination.droppableId as DroppableId]; //Column Destination
    
    //Create copys of the projects
    const sourceProjects = [...sourceColumn.projects as Project[]]; 
    const destinationProjects = [...destinationColumn.projects as Project[]];

    //Move projects beetween columns
    const [removed] = sourceProjects.splice(source.index, 1);
    destinationProjects.splice(destination.index, 0, removed);

    //Update columns
    setData((prev) =>({
      ...prev,
      columns: {
        ...prev.columns,
        [source.droppableId]: {...sourceColumn, projects: sourceProjects},
        [destination.droppableId]: {...destinationColumn, projects: destinationProjects},
      },
    }));

      try {
        removed.status = destination.droppableId as Status_project;
        
        await updateProject(removed, removed.id);
      } catch (error) {
        console.log("Error updating project:", error);
      }
    } 
      
      
    
  

  return (
  <section className="w-full max-w-[1500px] flex flex-col gap-8">
    <div className="header bg-zinc-50 p-6 flex justify-end rounded-lg shadow-md">
      <Button
        className="bg-orange-500 p-4 rounded-md font-semibold text-gray-100 "
        onClick={() => dispatch(openModal())}
      >
        Create Project
      </Button>
    </div>

    {isLoading ? (
      <p>Loading projects...</p>  // Mensaje de carga
    ) : (
      <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder<string>}>
        <div className="to-do bg-zinc-50 flex flex-col lg:flex-row gap-4 rounded-lg shadow-md ">
          {Object.entries(data.columns).map(([columnId, column]) => (
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
                      <p className="text-center text-lg text-zinc-400">No projects</p>
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
                              name={project.name}
                              description={project.description}
                              createdAt={project.createdAt}
                              status={project.status}
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
