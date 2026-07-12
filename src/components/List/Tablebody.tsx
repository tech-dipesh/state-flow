"use client"
import type {ChangeEvent, Dispatch, MouseEvent, SetStateAction, SubmitEvent} from 'react'
import  {  useState } from 'react'
import type {Task, TaskInterface} from '@/types/task'
import {dataContext} from '@context'
import CardTaskMenu from './Cardtaskmenu';
interface TAbleInterface{
  displayAllTasks: Task[];
  setTitleEdit: Dispatch<SetStateAction<string | null >> ;
  titleedit: string | null;
  setStatusEdit: Dispatch<SetStateAction<string | null >> ;
  statusedit: string | null;
}


interface InputInterface<E> {
  (e: E, id: string): void;
}


interface TaskType{
  task: Task;
}
export default function TableBody({ displayAllTasks, setTitleEdit, titleedit, setStatusEdit, statusedit }: TAbleInterface) {
  const camelCase=(value: string): string=>{
    return value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  }
  const startCase = (value: string): string =>  value.replace(/[-_]+/g, ' ')
  const {tasks, setTasks}=dataContext();


  const [editedinput, setEditedInput] = useState<string>('');
  const [bothEdit, setBothEdit] = useState<boolean>(false);
  const changeCurrentvalue: InputInterface<SubmitEvent<HTMLFormElement>>= (e, id)  => {
    e.preventDefault();
    e.stopPropagation();
    if (editedinput === '') {
      return;
    }
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: editedinput } : task
    ));

    setEditedInput('');
    setTitleEdit(null);
  }

  const optionEdit: InputInterface<ChangeEvent<HTMLSelectElement>>  = (e, id ) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: e.target.value } : task
    ));
    setBothEdit(!bothEdit);
    setStatusEdit(null);
  }

  const bothEditFeature = (e: MouseEvent<HTMLButtonElement>, task: Task)  => {
    e.stopPropagation();
    if (titleedit === task.id && statusedit === task.id) {
      setStatusEdit(null);
      setTitleEdit(null);
      setBothEdit(false);
    }
    else {
      setStatusEdit(task.id);
      setTitleEdit(task.id);
      setBothEdit(true);
    }
  }
  return (
    <tbody>
      {displayAllTasks.length == 0 ? (
        <tr>
          <td colSpan={8} className='p-2 md:p-4 text-lg  md:text-2xl lg:text-3xl text-red-500 font-semibold text-center'>The List is empty.</td>
        </tr>
      ) :
        (displayAllTasks.map((task: Task) => (
          <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-2 md:p-4 text-xs md:text-lg cursor-pointer max-w-37.5 truncate relative" onClick={() => setTitleEdit(task.id)}>
              {titleedit === task.id ? (
                <form
                  onSubmit={(e) => changeCurrentvalue(e, task.id)}
                  className="absolute top-0 left-0 flex gap-1 md:gap-2 items-center bg-blue-100 p-1 rounded shadow min-w-max z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    className="w-24 md:min-w-25.5 px-2 md:px-3 py-1 border border-blue-300 rounded text-black text-xs md:text-base"
                    placeholder={task.title}
                    value={editedinput}
                    onChange={(e) => setEditedInput(e.target.value)}
                    defaultValue={task.title}
                  />
                  <button
                    type="submit"
                    className="px-2 md:px-3 py-1 bg-green-500 text-white rounded text-xs md:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setTitleEdit(null)}
                    className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs md:text-sm md:px-3 hover:bg-gray-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                  <span className="hover:text-blue-600 transition-colors grid justify-center">{task.title}</span>
                )}
            </td>
            <td
              className={`p-2 md:p-3 text-xs md:text-lg rounded-xs cursor-pointer whitespace-nowrap relative
${task.status === 'To do' ? 'bg-gray-500' : task.status === 'In Progress' ? 'bg-gray-400' : 'bg-blue-500'}`}
              onClick={() => setStatusEdit(task.id)} >
              <span className="justify-center grid">{startCase(camelCase(task.status))}
                {statusedit === task.id &&
                  <span className="absolute top-0 left-0  flex  gap-1 items-center bg-blue-100 md:gap-2 min-w-max p-1 rounded shadow z-50">
                    <select onClick={(e) => e.stopPropagation()} className="text-xs md:text-sm px-1 md:px-2 bg-gray-200 cursor-pointer" onChange={(e) => optionEdit(e, task.id)}>
                      <option hidden>Select Option</option>
                      <option className='cursor-pointer'>To do</option>
                      <option  className='cursor-pointer'>In Progress</option>
                      <option  className='cursor-pointer'>Completed</option>
                    </select>
                    <button onClick={(e) => (e.stopPropagation(), setStatusEdit(null))} className="px-2 md:px-3 py-1 bg-green-500 text-white rounded text-xs md:text-sm cursor-pointer">Cancel</button>
                  </span>
                }
              </span>
            </td>
            <CardTaskMenu bothEdit={bothEdit} bothEditFeature={bothEditFeature} task={task}/>
          </tr>
        ))
        )}
    </tbody>
  )
}
