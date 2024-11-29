"use client";

import Card from "./Card";
import { PencilRuler } from "lucide-react";
import { monserrat, archivo_black } from "@/ui/fonts";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import FormUpdateProject from "./FormUpdateProject";
import { RootState } from "@/redux/store";
import { Project } from "@/types/projects";
import { selectProject, setProject } from "@/redux/projectSlice";

function ProjectCard({ id, name, description, status, createdAt }: Partial<Project>) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.project.projects.find((p) => p.id === id)
  );

  

  function handleOpenModal() {
    dispatch(selectProject(Number(id)));
    dispatch(openModal("updateProject"));
  }

  return (
   <Card className="flex flex-col gap-4 justify-between items-start">
      <div className="header flex flex-col ">
        <h2 className={`${archivo_black.className} text-xl font-extrabold text-gray-950`}>
          {project?.name}
        </h2>
        <p className="text-[0.7rem] text-gray-500">Created {project?.createdAt?.toLocaleString()}</p>
      </div>
      <p className="text-gray-900 text-md">{project?.description}</p>
      <p className="bg-orange-700 text-white p-2 rounded text-xs capitalize">{project?.status}</p>
      <div className="footer">
        <Button key={id} onClick={handleOpenModal}>
          <PencilRuler className="text-stone-600 w-5" />
        </Button>
      </div>
      <FormUpdateProject />
    </Card>
  );
}

export default ProjectCard;
