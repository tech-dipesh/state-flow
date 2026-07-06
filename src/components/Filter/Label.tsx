"use client"
import { useContext} from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import PopupProvider from '@context'
// const opt=[
//   { value: 'Personal Life', label: 'Personal Life',  isFixed: true },
//   { value: 'Business', label: 'Business',isFixed: true },
//   { value: 'Career', label: 'Career',},
//   { value: 'Health', label: 'Health' },
// ];

const Label = ({setIsLabel, id, setIsMenu, isMenu}) => {
  const {tasks, setTasks}=dataContext()
  const mathThatId=tasks.find(task=>task.id===id) || [];
  
  let allPossibleOptions=mathThatId.Labels?.map(t=> ({value: t, label: t}));
  const changeLabels=(value)=>{
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
