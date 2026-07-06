"use client"
import {  useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>{
    return initialValue;
  }
  );
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      setValue(JSON.parse(item));
    }
  }, [key]);
  const updateTheState=(updatedValue)=>{
    const valueToStore = typeof updatedValue === "function" ? updatedValue(value) : updatedValue;
    setValue(valueToStore);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }  }
  return [value, updateTheState];
}
