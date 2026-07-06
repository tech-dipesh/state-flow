"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {dataContext} from '@context'
import data from '@/data/Chart'

ChartJS.register(ArcElement, Tooltip, Legend);
export default function Chartcard() {
  const {tasks}=dataContext()
  let todo=0, progress=0, completed=0;
  tasks.map(t=>{
    const LowerValue=t.status.toLowerCase().replace(/\s+/g, "")
    LowerValue=="todo"?todo++:LowerValue=="inprogress"?progress++:completed++
  })
  const arr=[todo, progress, completed];
  data.datasets[0].data=arr;

  return (
    <>
      <h1 className='font-semibold flex justify-center my-8'>Chart Data</h1>
      <div className='w-full md:w-3/4 lg:w-2/4 mx-auto'>
        <div className='flex justify-center'>
          <Pie data={data} />
        </div>
      </div>
    </>
  )
}
