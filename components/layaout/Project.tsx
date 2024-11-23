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
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";



function Projects() {
  type DroppableId = "working" | "progress" | "completed";

  const dispatch = useDispatch();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    columns: {
      working: { name: "Working", projects: [] },
      progress: { name: "In progress", projects: [] },
      completed: { name: "Completed", projects: [] },
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
            working: {
              name: "Working",
              projects: dataProjects.projects.filter(
                (project: Project) =>
                  project.status === Status_project.ESTABLISHED
              ),
            },
            progress: {
              name: "In progress",
              projects: dataProjects.projects.filter(
                (project: Project) => project.status === Status_project.PROGRESS
              ),
            },
            completed: {
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

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    //Reorder projects
    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId as DroppableId];
      const reorderedProjects = [...column.projects];
      //Delete first element
      const [removed] = reorderedProjects.splice(source.index, 1);
      //Reorganize array
      reorderedProjects.splice(destination.index, 0, removed);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId as DroppableId]: {
            ...column,
            projects: reorderedProjects,
          },
        },
      });
    } else{
      const sourceColumn = data.columns[source.droppableId as DroppableId];
      const destColumn = data.columns[destination.droppableId as DroppableId];
      const sourceProjects = [...sourceColumn.projects as Project[]];
      const destProjects = [...destColumn.projects as Project[]];
      const [removed] = sourceProjects.splice(source.index, 1);
      destProjects.splice(destination.index, 0, removed);

        try {
          await updateProject(removed, removed.id);
        } catch (error) {
          
        }
    }
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="to-do bg-zinc-50  flex flex-col lg:flex-row gap-4 rounded-lg shadow-md  ">
          {Object.entries(data.columns).map(([columnId, column]) => (
            // Columns
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  className=" lg:w-[33%] flex flex-col gap-4 m-4 h-auto border shadow-md border-zinc-300 rounded-md p-4 "
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                   <div className="title border-b border-orange-400 p-1 ">
                    <h4 className="text-orange-400 font-semibold ">
                      {column.name}
                    </h4>
                  </div>
                  {column.projects.map((project: Project, index) => (
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
                          <ProjectCard name={project.name} description={project.description} createdAt={project.createdAt} status={project.status} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <CreateProject />
    </section>
  );
}

export default Projects;
