"use client"
import Card from "./Card";
import { PencilRuler } from 'lucide-react';

function ProjectCard() {
    return ( 
        <Card className="flex flex-col gap-4"  >
            <div className="header flex flex-col ">
                <h2 className="text-xl font-bold  text-gray-950">Proyecto 1</h2>
                <p className="text-[0.7rem] text-gray-400">Create 24-02-2024</p>
            </div>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur esse nisi dolore officia minima omnis distinctio itaque quo? Nesciunt eius quo quas of</p>
            <div className="footer">
                <div className="teams"></div>
                 <PencilRuler  className="text-stone-600 w-5"/>
            </div>
        </Card>
     );
}

export default ProjectCard;