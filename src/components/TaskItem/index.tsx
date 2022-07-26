import { Trash } from "phosphor-react";
import React from "react";

interface TaskItemProps {
  id: string;
  task: string;
  onDeleteTask: (id: string) => void;
  isChecked: (id: string) => void;
}


export function TaskItem({ id, task, onDeleteTask, isChecked}: TaskItemProps) {

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleChecked() {
    isChecked(id)
  }


  return (
    <div className="flex flex-row items-start pr-1 pb-1 md:pr-4 md:pb-4 bg-gray-600 rounded-md border border-yellow-400 ">
      <div className="flex mt-2 ml-2 md:mt-4 md:ml-4 ">
        <input type="checkbox" onChange={handleChecked} className="w-4 h-4 mt-1 peer text-green-600 rounded-full outline focus:rounded-full focus:outline-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <p className="text-[14px] md:text-sm ml-4 mr-4 w-[280px] md:w-[632px] md:pr-[57px] flex-wrap break-words peer-checked:line-through">{task}</p>
      </div>
      <button onClick={handleDeleteTask} title="Deletar Tarefa">
        <Trash className="hover:text-red-500 transition-all bg-transparent relative -top-3 md:-top-1 md:-ml-4 rounded-sm mt-5" size={24} />
      </button>
    </div>
  )
}