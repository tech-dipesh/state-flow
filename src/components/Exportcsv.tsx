"use client"
import Image from "next/image"
import { faFileCsv, faFileExport, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useState } from 'react'
import {dataContext} from '@context'
export default function Exportcsv() {
  const {tasks}=dataContext()
  const [isExport, setIsExport]=useState(false);

  const exportJson=(type)=>{
    const a = document.createElement('a');
    a.href = `data:${type}/json;charset=utf-8,` + encodeURIComponent(JSON.stringify(tasks));
    a.download = 'data.json';
    a.click();
    setIsExport(!isExport);
  }
  const exportCsv=()=>{
    const allCsvHeader= [['title','status','priority','date','Labels','id'],...tasks.map(task=>[task.title, task.status, task.priority, task.date, task.labels, task.id])].map(m=>m.join(",")).join('\r\n')
    const csvValue = "data:text/csv;charset=utf-8," +allCsvHeader;
    const encodedUri = encodeURI(csvValue);
    window.open(encodedUri);
    setIsExport(!isExport);
  }
  return (
    <div className='lg:mx-28'>
      <button className="opacitiy-85 cursor-pointer bg-blue-500 font-semibold text-white py-2 px-4 rounded hover:text-gray-500" onClick={()=>setIsExport(!isExport)}><FontAwesomeIcon icon={faFileExport} color='white'/>Export</button>
      {
        isExport &&
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='relative bg-gray-800 p-12 rounded flex gap-4'>
              <FontAwesomeIcon className='absolute top-2 right-2 cursor-pointer' icon={faXmark} onClick={()=>setIsExport(!isExport)}/>
              <div className='bg-blue-500 font-semibold py-2 px-4 rounded cursor-pointer text-white' onClick={()=>exportCsv('csv')}><FontAwesomeIcon icon={faFileCsv} color='white'/> CSV</div>
              <div className='bg-blue-500 font-semibold py-2 px-4 rounded flex items-center gap-1 cursor-pointer text-white' onClick={()=>exportJson('json')}>
                <Image src={"/json.png"} className='h-4 w-4'/> JSON
              </div>
            </div>
          </div>
      }
    </div>
  )
}
