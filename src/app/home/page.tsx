"use client"
import React, { useContext } from 'react'
import {dataContext} from '@context'
import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from '@/components/Chart/Chartcard'
import { useNavigate } from 'react-router';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const navigate=useNavigate();
  const {tasks}=dataContext()
  const allPinned=tasks.filter(({isPinned})=>isPinned==true);
  return (
    <>
      <h1 className="text-center text-lg font-semibold mb-3">
        📌 Pinned Tasks
      </h1>

      <div className="flex gap-4 justify-center overflow-x-auto px-4 py-3 snap-x">
        {allPinned.map(task => (
          <div
            key={task.id}
            className="snap-start min-w-45 bg-blue-500 text-white rounded-xl p-4 shadow-md"
          >
            <p className="font-semibold text-base truncate">Title: {task.title}</p>
            <span className="text-sm opacity-90">Priority: {task.priority}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-10">
        <h1 className="text-blue-500 font-semibold text-xl">
          Total Tasks: {tasks.length}
        </h1>
      </div>

      {tasks.length ==0 && (
        <div className='flex justify-center mt-4'>
          <p className='text-blue-500 text-sm md:text-base font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200'>
            The Projects are empty.
            <button className='opacitiy-85 cursor-pointer text-white bg-blue-500 font-semibold  py-2 px-4 rounded m-2 hover:text-gray-100'
              onClick={()=>navigate("./list")}
            >Create New</button>
          </p>
        </div>
      )}
      <Chart/>
    </>
  )
}
