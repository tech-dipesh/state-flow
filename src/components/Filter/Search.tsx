"use client"
import { useContext, useState } from "react"
import {dataContext} from '@context'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Search({ setSearchResults }) {
  const {tasks}=dataContext()
  const [search, setSearch] = useState();
  const [onFocus, setOnFocus] = useState(false);

  const searchValue = (e) => {
    setSearch(e.target.value)
    const storeAllMatchMovie = tasks.filter(task => {
      const getName = ((task.title).toLowerCase()).replaceAll(' ', '');
      return getName.includes(search)
    })
    setSearchResults(storeAllMatchMovie);
    console.log('focus', onFocus);
  }
  

  return (
    <div className='flex md:justify-end px-8 py-4'>
      <div className='flex flex-col gap-2'>
        <h2 className="text-lg font-semibold text-green-200 md:flex md:justify-center">Search Task:</h2>
        <div className='flex flex-col md:flex-row gap-3 items-center'>
          <input
            type="text"
            placeholder="Enter the task to search..."
            className="w-80 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            onFocus={()=>setOnFocus(true)}
            onBlur={()=>setOnFocus(false)}
            onChange={searchValue}
            value={search}
          />
          {onFocus && <FontAwesomeIcon icon={faXmark} onClick={()=>setSearch('')} className="cursor-pointer absolute ml:40 md:ml-70 tmd:text-2xl mt-2 lg:ml-46 "/>}
          <div className="flex gap-3 w-full md:auto">
          <button className="flex-1 md:flex-none md:px-2  px-6 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-pointer font-semibold hover:bg-gray-400 order-1 md:order-2"
            onClick={() => setSearch('')}>
            Clear
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer font-semibold hover:bg-blue-600 transition-colors  order-2 md:order-1">
            Search
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}
