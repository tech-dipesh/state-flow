"use client"
import {  useState } from "react";
// export type UseUndoRedoReturn<T> = {
//   present: T;
//   past: T[];
//   future: T[];
//   updateResult: (newValue: T | ((curr: T) => T)) => void;
//   undoOperation: () => void;
//   redoOperation: () => void;
// };
export default function useUndoRedo<T>(initialValue: T): UseUndoRedoReturn<T> {
  const [past, setPast] = useState<T[]>([])
  const [present, setPresent] = useState<T[]>(initialValue);
  const [future, setFuture] = useState<T[]>([])

  const updateResult = (newValue: T | ((curr: T)=>T)) => {
    setPresent(curr=>{
      const currentValue = Array.isArray(curr) ? curr : [];
      const actual = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      if(newValue===currentValue) return currentValue;
      setPast(prev=>[...prev, currentValue])
      return actual;
    })
    setFuture([])
  }

  const undoOperation=()=>{
    if(past.length===0) return;
    const newPresent = past.at(-1);
    const newPast = past.slice(0, -1);
    setFuture(prev => [present, ...prev]);
    setPresent(newPresent);
    setPast(newPast);
  }

  const redoOperation=()=>{
    if(future.length===0) return;
    const newPresent = future[0];
    const newFuture = future.slice(1);
    setPast(prev => [...prev, present]);
    setPresent(newPresent);
    setFuture(newFuture)
  }
  return {present, past, future, updateResult, undoOperation, redoOperation}
}
