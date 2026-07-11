"use client"
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
import  Link  from 'next/link'

export default function Footer() {
  const [date, setDate]=useState<string | undefined>()
  useEffect(() => {
    if(window!==undefined){
      setDate(Temporal.Now.plainDateISO())
    }

  }, [])

  const Style='text-slate-900 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors underline text-base md:text-lg'
  return (
    <footer className='bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 px-4'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
        <p className='text-slate-900 dark:text-slate-400 text-sm md:text-base text-center md:text-left font-sans'><FontAwesomeIcon icon={faCreativeCommons}/>2026 Dipendra Sharma. All rights reserved.</p>
        <div className='flex items-center gap-6'>
          <Link href='https://linkedin.com/in/tech-dipesh' 
            target='_blank' className={Style}>linkedin
          </Link>
          <Link href='https://github.com/tech-dipesh' 
            target='_blank' className={Style}>Github
          </Link>
        </div>
      </div>
    </footer>
  )
}
