
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Createbutton({isInput:inputZero, setIsInput:InputFirst}) {
  const navigate=useNavigate();
  const  [local, setLocal]=useState(false)
  const isInput=inputZero ?? local;
  const setIsInput=InputFirst ?? setLocal;
  return  <button
   className="opacitiy-85 lg:mx-28 cursor-pointer text-white bg-blue-500 font-semibold py-2 px-4 rounded hover:text-gray-500 md:px-5 md:left-12" 
   onClick={()=>(setIsInput(!isInput), navigate("../list"))}>
    <FontAwesomeIcon icon={faPlus} color='white'/>
    Create
    </button>
}
