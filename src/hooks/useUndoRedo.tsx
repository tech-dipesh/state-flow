"use client"
import {  useState } from "react";

export default function useUndoRedo(initialValue) {
   const [past, setPast] = useState([])
    const [present, setPresent] = useState(initialValue);
    const [future, setFuture] = useState([])

    const updateResult = (newValue) => {
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
