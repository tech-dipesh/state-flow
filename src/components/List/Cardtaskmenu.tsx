
import { faEllipsis, faThumbTack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import Option from '../Filter/Option'
import Label from "../Filter/Label"
import {dataContext} from '@context'
import { each, find } from 'lodash'
export default function CardTaskMenu({bothEdit, bothEditFeature, task}) {
  const [isMenu, setIsMenu]=useState(false);
  const [isLabel, setIsLabel]=useState(false);
  const [isPinned, setIsPinned]=useState(task.isPinned);
  const {setArchives} =useContext(dataContext)

  const {tasks, setTasks}=useContext(dataContext);
  const deleteTask=()=>{
    const thisId=task.id;
    const updateTask=tasks.filter(t=>t.id!==thisId);
    setTasks(updateTask);
  }

  const clickMenu=()=>{
    setIsLabel(false)
    setIsMenu(!isMenu)
  }
  
  const clickLabel=(e)=>{
    e.stopPropagation()
    setIsLabel(!isLabel)
  }

  const setPinned=()=>{
      setIsPinned(!isPinned)
       setTasks(tasks.map(eachTask => 
      eachTask.id === task.id ? {...eachTask, isPinned: true} : eachTask
      ));
  }
  
  const doArchives=()=>{
    const updateTask=tasks.filter(t=>t.id!==task.id);
    setTasks(updateTask);
//    setArchives(prev => {
//   const filtered = prev.filter(item => item.id !== task.id);
//   return [...filtered, task];
// });
    setArchives(prev=>[...prev, task])
  }

  const optionStyle='w-full px-2 py-1 justify-center text-left flex items-center cursor-pointer hover:bg-gray-700 text-white';
  return (
  <>
  <td className='p-2 w-full md:w-64 md:text-3xl'>
    <Option setTasks={setTasks} id={task.id} tasks={tasks} urgency={task.priority}/></td>
    <td className='grid justify-center my-2  md:text-3xl'>{task.date=='' ? 'null': `${task.date}`}</td>
      <td className="w-auto md:w-20  md:text-3xl">
        <button onClick={(e) => bothEditFeature(e, task)} className="p-2 m-2 bg-blue-400 rounded-xs cursor-pointer">{bothEdit === false ? 'Edit' : 'Save'}</button>
        </td>
  <td className="relative p-4 text-xl font-semibold text-left cursor-pointer  md:text-3xl" onClick={clickMenu}>
  <FontAwesomeIcon icon={faEllipsis}/>
  {isMenu && (
    // <div className='absolute w-40 md:w-32 right-0 lg:right-40 top-full mt-1 bg-gray-800 rounded-lg border border-gray-700 z-50 shadow-lg'>
    <div className='absolute w-64 md:w-72 lg:w-80 right-0 top-full mt-1 bg-gray-800 rounded-lg border border-gray-700 z-50 shadow-lg'>
      <button className={optionStyle} onClick={()=>deleteTask()}>Delete</button>
      <button className={optionStyle} onClick={(e)=>clickLabel(e)}>🏷️</button>
      
      {isLabel && (
        <div className='mt-2' onClick={(e)=>e.stopPropagation()}>
          <Label setIsLabel={setIsLabel} setIsMenu={setIsMenu} isMenu={isMenu} isLabel={isLabel} id={task.id}/>
        </div>
      )}
      <button className={optionStyle}>
      {isPinned ?
      <FontAwesomeIcon icon={faThumbTack} color='red' className='cursor-pointer' onClick={setPinned}/>:
      <FontAwesomeIcon icon={faThumbTack} className='cursor-pointer' onClick={setPinned}/>
    }
      </button>
      <button className={optionStyle} onClick={doArchives}>
      Archive
      </button>
      <button></button>
    </div>
  )}
</td>
  </>
  )
}
