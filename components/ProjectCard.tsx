"use client";

import Card from "./Card";
import { Ellipsis, PencilRuler } from "lucide-react";
import { monserrat, archivo_black } from "@/ui/fonts";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import FormUpdateProject from "./FormUpdateProject";
import { RootState } from "@/redux/store";
import { Project } from "@/types/projects";
import { selectProject, setProject } from "@/redux/projectSlice";
import { useState } from "react";
import { closeDropdown, openDropdown } from "@/redux/dropdownSlice";
import Dropdown from "./Dropdown";

function ProjectCard({ id, name, description, status, createdAt }: Partial<Project>) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.project.projects.find((p) => p.id === id)
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
   function handleDropdown() 
   { 
    setDropdownOpen(!dropdownOpen); 
   }

 

  

  

  function handleOpenModal() {
    dispatch(selectProject(Number(id)));
    dispatch(openModal("updateProject"));
  }

  return (
   <Card className="flex flex-col gap-4 justify-around items-start relative">
      <div className="header flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full">
        <h2 className={`${archivo_black.className} text-xl font-extrabold text-gray-950`}>
          {project?.name}
        </h2>
        <Button key={id} onClick={handleDropdown}>
          <Ellipsis className="text-orange-500" />
        </Button>
        </div>
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
      {dropdownOpen && <Dropdown projectId={Number(id)}/>}
    </Card>
  );
}

export default ProjectCard;
