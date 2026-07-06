"use client"
import TaskInput from "@/components/Input/Taskinput";
import { useState} from "react"
import TaskTable from "@/components/List/TaskTable"
import Search from "@/components/Filter/Search";
import Option from "@/components/Filter/Option"
import {dataContext} from '@context'
import Undoredo from "@/components/Undoredo";
import Createbutton from "@/components/common/Createbutton";
import Exportcsv from "@/components/Exportcsv";
import Loading from "@/components/Loader";
import Archive from "@/components/List/Archive";
export default function Task() {
  const {tasks}=dataContext();
  const [filterCritrea, setFilterCritrea]=useState();
  const [searchResults, setSearchResults] = useState(null);  
  const [isInput, setIsInput]=useState(false);
  return !tasks?<Loading/>:(
    <div className="min-h-screen">
      <TaskInput isInput={isInput} setIsInput={setIsInput}/>
      <Search filterCritrea={filterCritrea} setFilterCritrea={setFilterCritrea} setSearchResults={setSearchResults}/>
      <TaskTable filterCritrea={filterCritrea} setFilterCritrea={setFilterCritrea} searchResults={searchResults}/>
      <div className="flex justify-between w-full my-12 md:my-10 lg:my-24">
        <Createbutton isInput={isInput} setIsInput={setIsInput}/>
        <Exportcsv/>
        <Archive/>
      </div>
      <Undoredo/>
    </div>
  )
}
