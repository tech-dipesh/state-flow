import { useContext } from "react";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";

import {dataContext} from '@context'
import Undoredo from "../../Common/undoRedo";
const COLUMNS=[
  { id: "TODO", title: "To do",},
{ id: "IN PROGRESS", title: "In Progress"},
{ id: "COMPLETED", title: "Completed"},
]
export default function Columns() {
    const {tasks}=useContext(dataContext);
  return (
    <>
   <div className="flex items-start justify-center p-3 md:p-8 mt-2 lg:mt-8 md:mt-2">
  <div className="flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:flex-row  flex-col gap-2 md:gap-4 lg:gap-6 ">
        {COLUMNS.map(column => (
          <Column key={column.id} column={column} tasks={tasks.filter(item => {
            const listItem=item.status.toLowerCase().replace(/\s+/g, "");
            const columnList=column.id.toLowerCase().replace(/\s+/g, "");
            return listItem===columnList;
          })
        } />
      ))}
      </div>
    </div>
    <Undoredo className='mt-6 md:mt-18'/>
      </>
  )
}
