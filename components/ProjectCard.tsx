"use client"
import { Project } from "@/types/projects";
import Card from "./Card";
import { PencilRuler } from 'lucide-react';
import { monserrat, archivo_black } from "@/ui/fonts";


function ProjectCard({name, description, createdAt, status}:Partial<Project>) {
    return ( 
        <Card className="flex flex-col gap-4 justify-between items-start"  >
            <div className="header flex flex-col ">
                <h2 className={`${archivo_black.className} text-xl font-extrabold text-gray-950 `}>{name}</h2>
                
                <p className="text-[0.7rem] text-gray-500">Create {createdAt?.toLocaleString()}</p>
            </div>
            <p className="text-gray-900 text-md">{description}</p>
            <p className="bg-orange-700 text-white p-2 rounded text-xs capitalize"> 
                {status?.toLowerCase()}
                </p>
            <div className="footer">
                <div className="teams"></div>
                 <PencilRuler  className="text-stone-600 w-5"/>
            </div>
        </Card>
     );
}

export default ProjectCard;