"use client"
import React, { useContext, useEffect } from 'react'

export default function Keyword({setIsPopup, isPopup}) {
  const {undo, redo}=useContext();
  useEffect(()=>{
    if (typeof window === 'undefined') return;
    document.addEventListener("keydown", (e: KeyboardEvent)=>{
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
