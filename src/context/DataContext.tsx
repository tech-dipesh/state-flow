"use client"
import type {Dispatch, SetStateAction, ReactNode} from 'react'
import { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage"
import useUndoRedo from "@/hooks/useUndoRedo"
import type { Task } from "@/types/task";

interface PopupType{
  isPopup: boolean;
  setIsPopup: Dispatch<SetStateAction<boolean>>;
  tasks: Task[],
  setTasks (newValue: Task[] | ((prev: Task[])=>Task [])): void,
  undo: ()=>void;
  redo: ()=>void;
  canUndo: Task[][],
  canRedo: Task[][],
  archives: Task[];
  setArchives: Dispatch<SetStateAction<Task[]>>;

}
const PopupContext = createContext<PopupType | undefined>({} as PopupType);


export default function PopupProvider({children}: {children: ReactNode}) {
  const [isPopup, setIsPopup]=useState(false);
  const [storeTask, setStoreTask] = useLocalStorage<Task []>('tasks', []);
  const [archives, setArchives]=useLocalStorage<Task []>('archives', []);
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
      isPopup,
      setIsPopup,
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

export { useTheme as dataContext };
