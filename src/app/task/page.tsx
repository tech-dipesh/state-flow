"use client"
import type {Task} from '@/types/task'
import TaskInput from "@/components/Input/Taskinput";
import { useState} from "react"
import Search from "@/components/Filter/Search";
import {dataContext} from '@context'
import Undoredo from "@/components/Undoredo";
import Createbutton from "@/components/common/Createbutton";
import Exportcsv from "@/components/Exportcsv";
import Loading from "@/components/Loader";
import Archive from "@/components/List/Archive";
import Tasktable from '../../components/List/tasktable';
export default function Task() {
  const {tasks}=dataContext();
  const [filterCritrea, setFilterCritrea]=useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Task [] | null>(null);  
  const [isInput, setIsInput]=useState(false);
  return !tasks?<Loading/>:(
    <div className="min-h-screen">
      <TaskInput isInput={isInput} setIsInput={setIsInput}/>
      <Search   setSearchResults={setSearchResults}/>
      <Tasktable filterCritrea={filterCritrea} setFilterCritrea={setFilterCritrea} searchResults={searchResults}/>
      <div className="flex justify-between w-full my-12 md:my-10 lg:my-24">
        <Createbutton isInput={isInput} setIsInput={setIsInput}/>
        <Exportcsv/>
        <Archive/>
      </div>
      <Undoredo/>
    </div>
  )
}
