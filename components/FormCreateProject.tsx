"use client"

import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Modal from "./Modal";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import Button from "./Button";

function CreateProject() {
    
    const isModelOpen = useSelector((state:RootState) => state.modal.isModalOpen);
    const dispatch = useDispatch();

    if(!isModelOpen) return null;


    return (
      <Modal>
         <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        >
          X
        </button>
       <form action="" className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title project</label>
            <Input className=""></Input>
          </div>
          <div>
            <label htmlFor="describe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe project</label>
            <textarea
                placeholder="Write your thoughts here..."
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invite Members</label>
           <Input></Input>
          </div>

          <Button type="submit" className="bg-orange-600 text-gray-100 p-2 rounded-md">Create Project</Button>


       </form>
      </Modal>
    );
}

export default CreateProject;