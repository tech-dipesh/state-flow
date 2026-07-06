import TaskInput from "@/Components/Input/TaskInput";
import {useContext, useState} from "react"
import TaskTable from "@/Components/List View/TaskTable"
import Search from "@/Components/Filter/search";
import Option from "@/Components/Filter/Option"
import {dataContext} from '@context'
import Undoredo from "@/Common/undoRedo";
import Createbutton from "@/Common/Createbutton";
import Exportcsv from "@/Common/Exportcsv";
import Loading from "@/Common/Loader";
import Archive from "@/Components/List View/Archive";
export default function Task() {
  const {tasks}=useContext(dataContext);
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
