"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Keyboardshortcut from "@/components/Keyboardshortcut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header({isPopup, setIsPopup}) {
  const [isDark, setIsDark] = useState(true);
  const [isMobilePopup, setIsMobilePopup]=useState(false)

  const changeDarkMode = () => {
  setIsDark(!isDark);
  document.documentElement.classList.toggle('dark');
  }
  const allRoutes=[
    {name: 'Home', route: '/' },
    {name: 'Task', route: '/task' },
    {name: 'Board', route: '/board' },
    {name: 'Chart', route: '/chart' },
  ]
  const styleLi='cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors gap-8 px-8';
  
  return (
    <>
    <div className='mt-5 flex justify-between items-center px-4 md:px-12 lg:px-24 bg-wthie border-b border-slate-200 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-900 dark:border-slate-800 py-4'>
      <Link href='./' className='h-10 w-10 hover:opacity-80 transition-opacity'>
      <Image src="/logo.png" alt="Logo" height={40} width={40}/>
      </Link>
        <button 
      onClick={() => setIsMobilePopup(!isMobilePopup)}
      className="md:hidden text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
    >
      <FontAwesomeIcon icon={isMobilePopup ? faTimes : faBars} className="text-xl"/>
    </button>
      <ul className='hidden md:flex gap-4 md:gap-6 lg:gap-8 font-semibold text-sm md:text-base text-slate-700 dark:text-slate-300'>
        {allRoutes.map(({name, route})=>(
          <li className={styleLi} key={route}>
            <Link href={route}>{name}</Link>
          </li>
        ))}

        <li className={styleLi} onClick={() => setIsPopup(!isPopup)}>
          Shortcut
          {isPopup && <Keyboardshortcut setIsPopup={isPopup}/>}
        </li>
      </ul>
      <button 
      className='p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer'
      onClick={changeDarkMode}
      >
        {isDark ? (
          <FontAwesomeIcon className='text-yellow-400' size='2x' icon={faSun}/>
        ) : (
          <FontAwesomeIcon className='text-blue-900' size='2x' icon={faMoon}/>
        )}
      </button>
      </div>

      {isMobilePopup && (
      <nav className="md:hidden mt-4 pb-4 border-t border-slate-600 pt-4">
        <div className="flex flex-col gap-4">
          {allRoutes.map(link => (
            <Link 
              key={link.name}
              onClick={() => setIsMobilePopup(false)}
              className={({isActive}) => 
                `text-slate-300 hover:text-blue-400 cursor-pointer transition-colors duration-200 font-medium px-2 py-2 ${isActive ? 'text-blue-400 bg-slate-800/50 rounded-lg' : ''}`
            }
            href={link.route}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button 
        className='hidden md:block p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer'
        onClick={changeDarkMode}
      >
        {isDark ? (
          <FontAwesomeIcon className='text-yellow-400' size='2x' icon={faSun}/>
        ) : (
          <FontAwesomeIcon className='text-blue-900' size='2x' icon={faMoon}/>
        )}
      </button>
      </nav>
    )}
      </>
  )
} 
