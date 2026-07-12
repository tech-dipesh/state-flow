"use client"
import type {Task} from '@/types/task'
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
interface DateProps {
  setData: Dispatch<SetStateAction<Task>>;
}
export default function MyDatePicker({ setData }: DateProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formatTheDate=(date: Date)=>date.toLocaleDateString("en-US",
    { month:"numeric", day:"numeric", year:"numeric" }
  );

  const changeInputValue = (date: Date | null) =>{
    setSelectedDate(date);

 if (date) {
      setData((prev) => ({ ...prev, date: formatTheDate(date) }));
    } else {
      setData((prev) => ({ ...prev, date: "" })); 
    }
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
