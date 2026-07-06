"use client"
import { useState, createContext, useContext, useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage"
import useUndoRedo from "@/hooks/useUndoRedo"
const PopupContext=createContext({})


export default function PopupProvider({children}) {
  const [isPopup, setIsPopup]=useState(false);
  const [storeTask, setStoreTask] = useLocalStorage('tasks', []);
  const [archives, setArchives]=useLocalStorage('archives', []);
  const { 
    present,
    past,
    future,
    updateResult, 
    undoOperation, 
    redoOperation 
  } = useUndoRedo(storeTask);


useEffect(() => {
  setStoreTask(present);
}, [present, setStoreTask]);

  return (
    <PopupContext value={{
      isPopup, setIsPopup,
      tasks: present,
      setTasks: updateResult,
      undo: undoOperation,
      redo: redoOperation,
      canUndo: past,
      canRedo: future,
      archives, 
      setArchives
    }}>
      {children} 
    </PopupContext>
  );
}

export const useTheme=()=>{
  const context=useContext(PopupContext);
  if(!context){
    throw new Error("Popup Context is not provided")
  }
  return context;
}
