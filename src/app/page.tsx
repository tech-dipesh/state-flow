"use client"
import {useTheme} from '@context'
import Link from 'next/link'
import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Chartcard from '@/Components/Chart/Chartcard'
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {
  const {tasks}=useTheme()
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
           <div className='flex flex-col sm:flex-row items-center gap-2 text-blue-500 text-sm md:text-base font-semibold bg-red-50 px-4 py-2 rounded-lg border border-red-200'>
            <span>The Projects are empty.</span>
            <Link 
              href="/task" 
              className="opacity-85 hover:opacity-100 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded transition-all duration-200 inline-block"
            >
              Create New
            </Link>
          </div>
        </div>
      )}
      <Chartcard/>
    </>
  )
}
