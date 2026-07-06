
import { faBoxArchive, faDeleteLeft, faTrashCan, faUnlock, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import {dataContext} from '@context'

export default function Archive() {
  const [isArchive, setIsArchive]=useState(false);
    const {archives, setArchives} =useContext(dataContext)
  const deleteTask=(id)=>{
    setArchives(prev=>
      prev.filter(p=>p.id!==id)
    )
  }
  
  return (
   <div className="lg:mx-28 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors md:px-5"
  onClick={()=>setIsArchive(!isArchive)}>
  <FontAwesomeIcon icon={faBoxArchive}/>Archive List
  {isArchive &&
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='relative bg-gray-800 p-6 md:p-8 lg:p-12 rounded-lg shadow-2xl max-w-2xl flex flex-wrap gap-4 pt-12'> 
      <FontAwesomeIcon className='absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-gray-300 transition-colors z-10' icon={faDeleteLeft} onClick={()=>setIsArchive(!isArchive)}/>
        {archives.length==0?
        <div className='bg-blue-500 font-semibold py-4 px-6 rounded cursor-pointer text-white text-center w-full'>The Archive is empty</div>:
        archives.map(({id, title, status})=>(
          <div className='bg-blue-500 font-semibold py-6 px-4 rounded cursor-pointer text-white' onClick={()=>{}}>
            <div>Title: {title}</div>
            <div>Status: {status}</div>
            <div className='bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-3 rounded cursor-pointer mt-2'>Delete: <FontAwesomeIcon icon={faTrashCan} onClick={()=>deleteTask(id)}/></div>
            <div className='bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-3 rounded cursor-pointer mt-2'>UnArchive: <FontAwesomeIcon icon={faUnlock}/></div>
            </div>
        ))}
            </div>
        </div>
  }
</div>
  )
}
