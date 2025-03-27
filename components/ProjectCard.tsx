"use client";

import Card from "./Card";
import { Ellipsis, PencilRuler } from "lucide-react";
import { monserrat, archivo_black, lexen } from "@/ui/fonts";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";

import FormUpdateProject from "./FormUpdateProject";
import { RootState } from "@/redux/store";
import { Project } from "@/types/projects";
import { selectProject, setProject } from "@/redux/projectSlice";
import { useEffect, useState } from "react";

import Dropdown from "./Dropdown";

function ProjectCard({ id }: Partial<Project>) {
 
  let bgButton = ``;

  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.project.projects.find((p) => p.id === id)
  );

  if(project?.status === "ESTABLISHED"){
     bgButton = `bg-[#E66E5A]`;
  }else if (project?.status === "PROGRESS"){
     bgButton = `bg-[#E6E25A]`;
  }else{
    bgButton = `bg-[#17ad65]`;
  }

  const createdProject = project?.createdAt ? new Date(project.createdAt).toISOString().replace('T', ' ').slice(0,16) : 'Date not available';

 useEffect(() => { 
    if (id !== undefined) { 
    
      dispatch(selectProject(Number(id))); 
      } 
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
   function handleDropdown() 
   { 
    setDropdownOpen(!dropdownOpen); 
   }

 

  return (
   <Card className="flex flex-col gap-4 justify-around items-start relative">
      <div className="header flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full">
        <h2 className={`${lexen.className} text-xl font-extrabold text-gray-950`}>
          {project?.name}
        </h2>
        <Button key={id} onClick={handleDropdown}>
          <Ellipsis className="text-[#13F287]" />
        </Button>
        </div>
        <p className={`text-[0.7rem] text-gray-500 font-light ${lexen.className}`}>Created {createdProject}</p>
      </div>
      <p className={`text-gray-900 text-md font-light ${lexen.className}`}>{project?.description}</p>
      <p className={`${bgButton} ${lexen.className} text-[#101214] p-2 rounded text-xs capitalize`}>{project?.status}</p>
      <div className="footer">
      
      </div>
      <FormUpdateProject />
      {dropdownOpen && <Dropdown projectId={Number(id)}/>}
    </Card>
  );
}

export default ProjectCard;
