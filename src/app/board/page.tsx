"use client"
import React, { useContext} from "react";
import { closestCorners, DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {dataContext} from '@context'
import Columns from '@/Components/Board/Columns'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Createbutton from "../Common/Createbutton";
import Exportcsv from "../Common/Exportcsv";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
export default function Board (){
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );
  const {tasks, setTasks}=useContext(dataContext);

  const handleDragDnd=(e: KeyboardEvent)=>{
    if (!e.over) return;
    const taskId = e.active.id;
    const newStatus = e.over.id;
    const currentTaskValue = tasks.find(t => t.id === taskId);
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, status: newStatus} : task
    ));
  }
  return (
    <DndContext onDragEnd={handleDragDnd} collisionDetection={closestCorners} sensors={sensors}>
      <Columns/>
      <div className="flex justify-between w-full my-24">
        <Createbutton/>
        <div className="flex items-center gap-2 bg-slate-700 border border-yellow-300 text-white text-sm rounded-lg px-4 py-2 max-w-xs sm:max-w-sm md:max-w-md text-center mx-auto">
          <span className="text-base"><FontAwesomeIcon icon={faLightbulb} color="gray"/></span>
          <p className="leading-snug">
            <span className="font-semibold">Tip:</span> Drag and drop any task card between columns —{" "}
            <span className="font-medium">To Do</span>,{" "}
            <span className="font-medium">In Progress</span>, or{" "}
            <span className="font-medium">Completed</span>.
          </p>
        </div>
        <Exportcsv/>
      </div>
    </DndContext>
  )
}
