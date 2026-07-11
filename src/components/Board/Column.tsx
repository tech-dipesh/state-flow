"use client"
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./Taskcard";
import type { Task } from '@/types/task'
export type TaskStatus = 'TODO' | 'IN PROGRESS' | 'DONE';
export interface ColumnType {
  id: string;
  title: string;
}
export interface EachColumnProps{
  tasks: Task[];
  column: ColumnType;
}
export default function Column({tasks, column}: EachColumnProps) {
  const allNode=useDroppable({
    id: column.id
  })
  const {setNodeRef}=allNode
  return (
    <div className="flex w-screen md:w-60 lg:w-80 flex-col rounded-lg border snap-center border-neutral-600 bg-neutral-800 p-2 md:p-4" ref={setNodeRef}>
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="flex flex-1 flex-col gap-2 md:gap-4">
        {tasks.map(task=>(
          <TaskCard key={task.id} task={task}/>
        ))}
      </div>
    </div>
  )
}
