"use client"
import {  useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>{
    if(typeof window ===undefined){
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  }
  );
  const updateTheState=(updatedValue)=>{
    if(typeof window===undefined) return;
    if(typeof updatedValue==='function'){
      const Fun=updatedValue(value);
      localStorage.setItem(key, JSON.stringify(Fun));
      setValue(Fun)
    }
    else{
      localStorage.setItem(key, JSON.stringify(updatedValue))
      setValue(updatedValue)
    }
  }
  return [value, updateTheState];
}
