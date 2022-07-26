import { PlusCircleIcon } from "@heroicons/react/outline";
import { ClipboardText } from "phosphor-react";
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { TaskItem } from "../TaskItem";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  isChecked: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setNewTaskText] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  } , []);

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title: taskText,
      isChecked: false
    }
    setTasks([...tasks, newTask])
    window.localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setNewTaskText("");
  }

  function handleNewTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity("");
    setNewTaskText(e.target.value);
  }



  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }

  function handleChecked(taskToCheck: string) {
    const tasksWithoutChecked = tasks.find(task => {
      return task.id === taskToCheck
    })
    if(tasksWithoutChecked?.isChecked === false) {
      tasksWithoutChecked.isChecked = true
      setTasksCompleted([...tasksCompleted, tasksWithoutChecked])
    } else if(tasksWithoutChecked?.isChecked === true){
      tasksWithoutChecked.isChecked = false
      setTasksCompleted(tasksCompleted.filter(task => {
        return task.id !== taskToCheck
      }))
    }
  }

  const isNewTaskEmpty = taskText.length === 0 || taskText.trim().length === 0;

  return (
    <div className="flex flex-col items-center">
      <div className="flex relative items-center w-[23.5rem] md:w-[736px] h-[3rem] md:h-[3.313rem] -top-7">
        <form onSubmit={handleCreateNewTask} className='flex h-full gap-2 w-full'>
          <input type="text" value={taskText} onChange={handleNewTaskTextChange} placeholder="Escreva aqui uma nova tarefa" className="invalid:outline-red-500 bg-gray-600 text-yellow-500 placeholder-gray-400 focus:rounded-md focus:outline-yellow-400 w-[39.875rem]  h-full rounded-md border-none" />
          <button type="submit" disabled={isNewTaskEmpty} className="flex items-center disabled:bg-yellow-600 justify-center w-[12rem] md:w-[5.625rem] bg-yellow-400 hover:bg-yellow-500 h-full focus: outline-yellow-400 rounded-md text-blue-600 border-none transition-all">
            Criar <PlusCircleIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
      <div className=" flex mt-16 justify-between w-[23.5rem] md:w-[736px]">
        <div className="flex items-center">
          <strong className="text-sm">Tarefas criadas</strong><div className="flex items-center ml-2 justify-center font-[500] text-sm h-4 px-2 rounded-full bg-yellow-400 text-gray-900">{tasks.length}</div>
        </div>
        <div className="flex items-center">
          <strong className="text-sm text-green-600">Concluídas</strong><div className="flex items-center ml-2 justify-center font-[500] text-sm h-4 px-2 rounded-full bg-yellow-400 text-gray-900">{tasksCompleted.length ? `${tasksCompleted.length} de ${tasks.length}` : `${tasks.length}`}</div>
        </div>
      </div>
      {tasks.length == 0 ?
        <>
          <div className="border-t mt-[1rem] md:mt-[1.625rem] border-yellow-400 " />
          <div className="flex items-center justify-center mt-8 flex-col">
            <ClipboardText size={56} color="#fcc729" weight="duotone" />
            <strong className="text-base">Você ainda não tem tarefas cadastradas</strong>
            <p className="text-base">Crie tarefas e organize seus itens a fazer</p>
          </div>
        </>
        :
        <div className="flex flex-col mt-[1rem] md:mt-[1.625rem] md:w-[736px] gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              task={task.title}
              onDeleteTask={deleteTask}
              isChecked={handleChecked}
            />
          ))}
        </div>
      }
    </div>

  )
}