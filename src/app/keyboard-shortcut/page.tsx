"use client"
import { faMagnifyingGlass, faUpLong, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { createPortal } from 'react-dom'
export default function Keyboardshortcut({isPopup, setIsPopup}) {
  const allCommand = [
    { key: '?', useCase: 'Open Keyword Shortcut' },
    // { key: 'k', useCase: 'Search List' },
    { key: 'b', useCase: 'Open Board' },
    { key: 'l', useCase: 'Open List' },
    { key: 'v', useCase: 'Go To Homepage' },
    // { key: 'd', useCase: 'Delete Selected Item' },
    { key: 'z', useCase: 'Undo Action' },
    { key: 'y', useCase: 'Redo Action' },
    // { key: 'f', useCase: 'Focus on search bar' },
    { key: 'Esc', useCase: "Close Any Option if the've selected" },
    // { key: 'n', useCase: "Create Issue" },
  ]

  return createPortal(
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center'>
      <div className='w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 m-12'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='font-semibold text-black text-xl'>Keyboard shortcuts</h3>
          <FontAwesomeIcon icon={faXmark} className='text-gray-500 cursor-pointer hover:text-gray-700 p-0 text-base md:text-2xl md:p-' onClick={()=>setIsPopup(!isPopup)}/>
        </div>
        <div className="mb-6">
          <FontAwesomeIcon 
            icon={faMagnifyingGlass}  className='absolute left-2xl p-2 text-gray-400 '/>
          <input type="text" className="bg-gray-100 h-10 w-full rounded-lg text-gray-700 px-10 border border-gray-300 focus:outline-none focus:border-gray-400" placeholder='Search Shortcut' />
        </div>
        <div className='space--y-2' onClick={(e)=>e.stopPropagation()}>
          {allCommand.map(command => (
            <div className='flex justify-between items-center py-2' key={command.key}>
              <div className='text-black text-sm'>{command.useCase}</div>
              <div className='flex gap-2 items-center text-xl '>
                <FontAwesomeIcon icon={faUpLong} className='text-sm text-gray-500 bg-gray-100 p-2'/>
                <div className='px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm font-medium'> {command.key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}
