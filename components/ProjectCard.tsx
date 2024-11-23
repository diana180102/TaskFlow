"use client"
import { Project } from "@/types/projects";
import Card from "./Card";
import { PencilRuler } from 'lucide-react';

function ProjectCard({name, description, createdAt, status}:Partial<Project>) {
    return ( 
        <Card className="flex flex-col gap-4"  >
            <div className="header flex flex-col ">
                <h2 className="text-xl font-bold  text-gray-950">{name}</h2>
                <p className="text-[0.7rem] text-gray-400">Create {createdAt?.toLocaleString()}</p>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
            <p>{status}</p>
            <div className="footer">
                <div className="teams"></div>
                 <PencilRuler  className="text-stone-600 w-5"/>
            </div>
        </Card>
     );
}

export default ProjectCard;