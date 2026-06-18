import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/dataContextProvider';
import { useNavigate } from 'react-router';

export default function Keyword({setIsPopup, isPopup}) {
  const {undo, redo}=useContext(dataContext);
  const navigate=useNavigate();
  useEffect(()=>{
    document.addEventListener("keydown", (e)=>{
      if(e.key=='Escape'){
        setIsPopup(false)
      }
      if(e.key=="/" && e.ctrlKey===true){
        setIsPopup(!isPopup)
      }
      if(e.key=="z" && e.ctrlKey===true){
        undo()
      }
      if(e.key=="z" && e.ctrlKey===true){
        redo()
      }
      // if(e.key=="k" && e.ctrlKey===true){
      //   redo()
      // }
      if(e.key=="b" && e.ctrlKey){
        navigate("/board")
      }
      if(e.key=="l" && e.ctrlKey){
        navigate("/list")
      }
      if(e.key=="v" && e.altKey){
        navigate("/")
      }
      if(e.key=="v" && e.ctrlKey){
        navigate("/")
      }
      
    })
  })
  return <h1></h1>
}
