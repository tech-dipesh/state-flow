"use client"
import type {Dispatch, MouseEvent, ReactHTMLElement, SetStateAction} from 'react'
import {   useState } from "react";
import Filter from "../Filter/Filters";
import { faFilter, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableBody from "./Tablebody";
import {dataContext} from '@context'
//
// interface filterProps{
//   filterCritrea: string | null  ;
//   setFilterCritrea: Dispatch<SetStateAction<string | null | number>>;
//   searchResults: string | null
// }
export default function TaskTable({filterCritrea,  setFilterCritrea, searchResults }: filterProps) {
  const {tasks}=dataContext()

  const [titleedit, setTitleEdit] = useState(null);
  const [isFilterPopup, SetIsFilterPopup]=useState(false);
  const [statusedit, setStatusEdit] = useState(null);

  const [defaultSort, setDefaultSort]=useState("Relevence")
  const [isSortOption, setIsSortOption]=useState(false);
  const baseResult= searchResults?searchResults:
    filterCritrea
      ? tasks.filter(task => task.status.toLowerCase() === filterCritrea?.toLowerCase())
      : tasks;

  const allSortMethod=["Relevence", "Ascending", "Descending", "Priority", "Status", "Deadline"]
  const displayAllTasks=defaultSort=="Relevence"?baseResult:defaultSort=="Ascending"?[...baseResult].sort((a, b)=>a.title.localeCompare(b.title)):defaultSort=="Descending"?[...baseResult].sort((a, b)=>b.title.localeCompare(a.title)):defaultSort=="Priority"? [...baseResult].sort((a, b)=>a.priority.localeCompare(b.priority)):defaultSort=="Status"?[...baseResult].sort((a, b)=>a.status.localeCompare(b.status)):[...baseResult].sort((a, b)=>a.date.localeCompare(b.date));

  const sortTheData=(e: MouseEvent<HTMLButtonElement>)=>{
    setIsSortOption(!isSortOption);
    setDefaultSort(e.currentTarget.textContent || "")
  }
  const eventDelegation=(e: MouseEvent<HTMLTableElement>): void=>{
    const target=e.target as HTMLElement;
    if (target === e.currentTarget ||
      target.tagName === 'TBODY' ||
      target.tagName === 'TR' ||
      target.tagName === 'TH') {
      setTitleEdit(null);
      setStatusEdit(null);
    }
  }


  const TH_STYLE="md:table-cell p-2 md:p-4 text-center text-xs md:text-sm lg:text-2xl  md:whitespace-nowrap font-semibold dark:text-blue-600"

  return (
    <div className="flex flex-col items-center p-1 md:p-2 lg:p-4 ">
      <h1 className="text-xl font-bold my-2 md:text-2xl lg:text-3xl">Task Table</h1>
      <table className="min-w-full max-w-2xl border-2 overflow-x-auto border-gray-300 md:max-w-5xl md:whitespace-nowrap lg:w-full lg:max-w-7xl md:table-auto"
        onClick={(e: MouseEvent<HTMLTableElement>)=>eventDelegation(e)}
      >
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300  lg:my-8">
            <th className="p-2 md:p-4 m-0 md:m-1 font-semibold text-left text-sm md:text-lg lg:text-xl relative max-w-30 md:max-w-none">
              Title
              <span className="ml-2 py-1 px-2 text-xs rounded-xs bg-gray-400 opacity-65 cursor-pointer relative md:text-base" onClick={()=>setIsSortOption(!isSortOption)}>
                <span className="md:hidden">{defaultSort}</span>
                <span className="hidden md:inline">Sort By: {defaultSort}</span>
                <FontAwesomeIcon icon={faSquareCaretDown}/>
              </span>
              {isSortOption && 
                <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded-md shadow-lg z-50 min-w-max">
                  {allSortMethod.map(each=>(
                    <div key={each} className="bg-gray-800 px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer text-white first:rounded-t-md last:rounded-b-md" onClick={(e)=>sortTheData(e)}>{each}</div>
                  ))}
                </div>
              }
            </th>
            <th className={TH_STYLE}>Status
              <FontAwesomeIcon icon={faFilter} className='text-sm md:text-base cursor-pointer hover:text-blue-500 transition-colors ml-2 md:ml-5' onClick={()=>SetIsFilterPopup(!isFilterPopup)}/>
              <Filter options={["To do", "In progress", "Completed"]} isFilterPopup={isFilterPopup} SetIsFilterPopup={SetIsFilterPopup}  setOptionValue={setFilterCritrea}/>
            </th>
            <th className={TH_STYLE}>Priority</th>
            <th className={TH_STYLE}>Deadline</th>
            <th className={TH_STYLE}>Change</th>
            <th className={TH_STYLE}>Manage</th>
          </tr>
        </thead>
        <TableBody displayAllTasks={displayAllTasks} titleedit={titleedit} setTitleEdit={setTitleEdit} statusedit={statusedit} setStatusEdit={setStatusEdit} />
      </table>
    </div>
  )
}
