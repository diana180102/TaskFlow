"use client";

import Button from "@/components/Button";
import { openModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import ProjectCard from "../ProjectCard";
import CreateProject from "../FormCreateProject";


function Projects() {
   const dispatch = useDispatch();

   
  
  
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

      <div className="to-do bg-zinc-50  flex flex-col lg:flex-row gap-4 rounded-lg shadow-md  ">
        <div className="working lg:w-[33%] flex flex-col gap-4 m-4">
          <div className="title">
            <h4 className="text-orange-400 font-semibold">Working</h4>
          </div>
          <ProjectCard />
        </div>
        <div className="progress lg:w-[33%] flex flex-col gap-4 m-4">
          <div className="title">
            <h4 className="text-orange-400 font-semibold">In progress</h4>
          </div>
          <ProjectCard />
        </div>
        <div className="Complete lg:w-[33%] flex flex-col gap-4 m-4">
          <div className="title">
            <h4 className="text-orange-400 font-semibold">Done</h4>
          </div>
          <ProjectCard />
        </div>
      </div>
      <CreateProject />
    </section>
  );
}

export default Projects;
