"use client"
import React, {  ChangeEvent, Dispatch, SetStateAction, SubmitEvent, useState } from 'react'

import type {Task} from '@/types/task'
import {dataContext} from '@context'
import Date from './Date';

interface PropInterface{
  isInput: boolean;
  setIsInput: Dispatch<SetStateAction<boolean>>
}
type AllPriority = "Low" | "Medium" | "High";
type AllStatus = "In Progress" | "Todo" | "Completed";

export interface DateInputsInterface {
  id?: string;
  title: string;
  status: AllStatus;
  priority: AllPriority;
  date: string;
  Labels?: string[];
  isPinned?: boolean;
}
export default function TaskInput({isInput, setIsInput}: PropInterface) {
  const {setTasks}=dataContext()  
  const [data, setData]=useState<Task>({
    title: '',
    status: '', 
    priority: 'Medium',
    date: '', 
    Labels: [], 
    id: '', 
    isPinned: false
  });
const [error, setError]=useState<string | boolean>('');
const submitForm=(e: SubmitEvent)=>{
  e.preventDefault();
  if(!(data.title)){
    setError("Please Enter the Title");
    return;
  }
  if(!(data.status)){
    setError("Please Select any status.");
    return;
  }
  const newTaskWithId={...data, id: crypto.randomUUID()};
    setTasks((prev)=>[...prev, newTaskWithId])
    setError(false)
    setData({
      title: "",
      status: "",
      priority: "Medium",
      date: "",
      Labels: [],
      id: "",
      isPinned: false,
    });
  }
  const updateTask=(e: ChangeEvent<HTMLInputElement>)=>{
      setData((prev) => ({ ...prev, title: e.target.value as AllStatus }))
  }
  return (
    <>
      <div className='flex justify-center lg:mx-48 md:justify-between px-8 py-4'>
        {isInput && 
          <div className='md:flex-row gap-3 md:gap-4  md:items-center'>
            <h2 className="text-lg font-semibold text-gray-700 flex justify-center">Enter New Task:</h2>
            <form onSubmit={submitForm} 
              className='flex flex-col gap-2 md:flex-row md:gap-4 md:items-center justify-center'>
              <input type="text" placeholder='Please Enter your task.' name='title' className='w-full md:w-64 lg:w-80 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm md:text-base'
              onChange={updateTask}
              value={data.title}/>
              <select name="status" className='w-full md:w-48 lg:w-56 px-3 py-2 border-2 border-gray-300 rounded-lg cursor-pointer text-sm md:text-base focus:outline-none focus:border-blue-500' onChange={(e: ChangeEvent<HTMLSelectElement>)=>setData((prev)=>({...prev, status: e.target.value}))} value={data.status}>
                <option hidden value=''>Change Status</option>
                <option value='todo'>To do</option>
                <option value='inprogress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
              <div className='w-full md:w-auto'>
                <Date setData={setData}/>
              </div>
              <input
                className='w-full md:w-auto cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm md:text-base' type='submit' value='Cancel' onClick={()=>{setIsInput(!isInput)}}/>
              <input
                className='w-full md:w-auto cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm md:text-base' type='submit'/>
            </form>
          </div>
        }
      </div>
      {(typeof error==="string") && error.length > 0 && (
        <div className='flex justify-center mt-4'>
          <p className='text-red-500 text-sm md:text-base font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200'>
            {error}
          </p>
        </div>
      )}
    </>
  )
}
