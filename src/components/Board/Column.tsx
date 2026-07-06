import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({tasks, column}) {
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
