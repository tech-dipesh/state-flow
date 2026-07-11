"use client"
import { useDraggable } from "@dnd-kit/core"
import type {TaskCardProps} from '@/types/task'
import { CSS } from '@dnd-kit/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faGripLines } from '@fortawesome/free-solid-svg-icons';
export default function TaskCard({task}: TaskCardProps) {
  const getDraggable=useDraggable({
    id: task.id
  })
  const {attributes, listeners, setNodeRef, transform}=getDraggable;
  const style={
    transform: CSS.Translate.toString(transform)
  }
  return (
    <div style={style} className={`cursor-grab rounded-lg border border-neutral-600 ${task.status=="TODO"? 'bg-gray-500': task.status=="IN PROGRESS"?'bg-gray-400':'bg-blue-500'} p-2 md:p-4 text-sm md:text-base shadow-sm hover:shadow-md transition-shadow`} {...listeners} ref={setNodeRef} {...attributes}>
        <h4 className='mt-1 md:mt-2 lg:mt-4 text-base md:text-sm flex justify-center align-middle' >{task.title}
          <span className={`mx-2 md:mx-4 lg:mx-6 ${task.priority=="High"?'bg-red-500':task.priority=="Medium"?'bg-gray-700': 'bg-gray-400'}`}>{task.priority=="Low"?<FontAwesomeIcon icon={faCaretDown}/>: task.priority=="Medium"?<FontAwesomeIcon icon={faGripLines}/>:<FontAwesomeIcon icon={faCaretUp}/>}</span>
        </h4>
    </div>
  )
}
