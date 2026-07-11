"use client"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch,  SetStateAction, useState } from 'react'
import Link from 'next/link'
 interface buttonProps {
  isInput?: boolean;
  setIsInput?: Dispatch<SetStateAction<boolean>>;
}
export default function Createbutton({isInput:inputZero, setIsInput:InputFirst}: buttonProps) {
  const  [local, setLocal]=useState(false)
  const isInput=inputZero ?? local;
  const setIsInput=InputFirst ?? setLocal;
  return  <button className="opacitiy-85 lg:mx-28 cursor-pointer text-white bg-blue-500 font-semibold py-2 px-4 rounded hover:text-gray-500 md:px-5 md:left-12" 
   onClick={()=>(setIsInput(!isInput), <Link href="../list"/>)}>
    <FontAwesomeIcon icon={faPlus} color='white'/>
    Create
    </button>
}
