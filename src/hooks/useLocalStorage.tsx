"use client"
import {  useState } from "react";

export default function useLocalStorage(key, initialValue) {
const [value, setValue] = useState(() =>
  JSON.parse(localStorage.getItem(key)) ?? initialValue
);
  const updateTheState=(updatedValue)=>{
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
