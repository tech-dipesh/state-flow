"use client"
import { redirect } from 'next/navigation'
import  {  Dispatch, SetStateAction, useEffect } from 'react'
import {dataContext} from '@context'
interface PopupInterface{
  setIsPopup: Dispatch<SetStateAction<boolean>>;
  isPopup: boolean;
};
export default function Keyword({setIsPopup, isPopup}: PopupInterface) {
  const {undo, redo}=dataContext();
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
        redirect("/board")
      }
      if(e.key=="l" && e.ctrlKey){
        redirect("/list")
      }
      if(e.key=="v" && e.altKey){
        redirect("/")
      }
      if(e.key=="v" && e.ctrlKey){
        redirect("/")
      }
      
    })
  })
  return <h1></h1>
}
