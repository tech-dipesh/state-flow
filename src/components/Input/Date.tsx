"use client"
import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function MyDatePicker({setData}){
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatTheDate=date=>date.toLocaleDateString("en-US",
    { month:"numeric", day:"numeric", year:"numeric" }
  );

  const changeInputValue = (date) =>{
    setSelectedDate(date);
    setData(prev=>({...prev, date: formatTheDate(date)}))
  }
  return(
    <DatePicker
      className="bg-blue-500 cursor-pointer rounded-xs"
      selected={selectedDate}
      onChange={changeInputValue}
      minDate={new Date()}
      showIcon  
      dateFormat="MMMM d, yyyy"
    />
  ) 
};
