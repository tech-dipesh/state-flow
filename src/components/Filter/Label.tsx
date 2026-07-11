"use client"
import { Dispatch, FC, SetStateAction, useContext} from 'react';
import Select, { MultiValue } from 'react-select'
import CreatableSelect from 'react-select/creatable';
import {dataContext} from '@context'
import {ContextTypes} from '@/types/task'
// const opt=[
//   { value: 'Personal Life', label: 'Personal Life',  isFixed: true },
//   { value: 'Business', label: 'Business',isFixed: true },
//   { value: 'Career', label: 'Career',},
//   { value: 'Health', label: 'Health' },
// ];
interface SelectOption {
  value: string;
  label: string;
}
 interface Task {
  id: string | number;
  Labels?: string[];
}
 interface LabelProps {
  setIsLabel: (value: boolean) => void;
  id: string | number;
  setIsMenu: (value: boolean) => void;
  isMenu: boolean;
}
interface DataContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}



const Label: FC<LabelProps>= ({setIsLabel, id, setIsMenu, isMenu}) => {
  const {tasks, setTasks}=dataContext() as ContextTypes;
  const mathThatId=tasks?.find(task=>task.id===id) || [];
  
  const allPossibleOptions: SelectOption[]=mathThatId.Labels?.map(t=> ({value: t, label: t}));
  const changeLabels=(value: MultiValue<SelectOption>)=>{
    setIsLabel(true)
    const allListValues=value.map(f=>f.value) || []
    setTasks(prev=>
      prev.map(task=>
        task.id===id ?{...task, Labels: allListValues}:task
        ))
  }
  return (
    // <div className='w-32 md:w-48 lg:w-48 relative p-2 flex flex-col'>
    <div className='w-full p-3 flex flex-col gap-2'>
    <CreatableSelect
    styles={{
    container: (base) => ({ ...base, width: '100%' }),
    menu: (base) => ({ ...base, zIndex: 100 }),
    input: (base=>({...base, cursor: 'text'}))
  }}
    isMulti
    options={allPossibleOptions}
    onChange={changeLabels}
    autoFocus
    openMenuOnFocus
    />
    <button className='w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer font-semibold' onClick={()=>setIsMenu(!isMenu)}>Ok</button>
    </div>
  )
}
export default Label;
