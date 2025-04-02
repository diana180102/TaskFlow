"use client";
import { closeModal } from "@/redux/modalSlice";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useState, useEffect } from "react";
import { setProject } from "@/redux/projectSlice";
import { RootState } from "@/redux/store";
import { Project } from "@/types/projects";
import { updateProject } from "@/services/projectService";
import { lexen } from "@/ui/fonts";

function FormUpdateProject() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);
  const selectedProjectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);

  const existingProject = projects.find((project) => project.id === selectedProjectId);

  const [data, setData] = useState({
    name: existingProject?.name || "",
    description: existingProject?.description || "",
  });

  useEffect(() => {
    if (existingProject) {
      setData({
        name: existingProject.name,
        description: existingProject.description,
      });
    }
  }, [existingProject]);

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!existingProject) {
      console.error("Project not found");
      return;
    }

    try {
      const updatedProject: Partial<Project> = {
        id: existingProject.id,
        name: data.name,
        description: data.description,
        status: existingProject.status,
      };

      await updateProject(updatedProject, updatedProject.id!);
      dispatch(setProject(updatedProject));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(closeModal());
    }
  }

  if (!isModalOpen) return null;

  return (
    <>
      {isModalOpen === "updateProject" && (
        <Modal>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4  relative">
            <Button
            onClick={() => dispatch(closeModal())}
            className="absolute top-[-20px] right-[-20px]  text-white rounded-full p-2  w-[30px] h-[30px] btn-close"
          >
            X
          </Button>
            <div>
              <label htmlFor="name" className={`${lexen.className}`}>Name Project</label>
              <Input name="name" value={data.name} onChange={onChangeInput} />
            </div>
            <div>
              <label htmlFor="description" className={`${lexen.className}`}>Description Project</label>
              <Input name="description" value={data.description} onChange={onChangeInput} />
            </div>
            <Button className="bg-[#9FC131] hover:bg-[#bada53] rounded-md p-2 ">Save</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default FormUpdateProject;
