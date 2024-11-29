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
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name Project</label>
              <Input name="name" value={data.name} onChange={onChangeInput} />
            </div>
            <div>
              <label htmlFor="description">Description Project</label>
              <Input name="description" value={data.description} onChange={onChangeInput} />
            </div>
            <Button>Save</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default FormUpdateProject;
