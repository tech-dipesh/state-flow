import { Dispatch, MouseEvent, SetStateAction, SubmitEvent } from "react";

export type TaskPriority = 'Low' | 'Medium' | 'High' | null;

export type TaskOption= "To do"| "In progress"| "Completed" 

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: TaskPriority;
  date: string;
  Labels?: string[];
  isPinned?: boolean;
}


export interface PopupType{
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



export interface FilterProps{
  options: TaskOption[];
  isFilterPopup: boolean
  SetIsFilterPopup: Dispatch<SetStateAction<boolean>>;
  setOptionValue: Dispatch<SetStateAction<string | null>>;
}

export type ContextTypes = Partial<PopupType>;
  export interface TaskCardProps {
  task: Task; 
}



export interface TaskInterface{
  e: MouseEvent<HTMLButtonElement>;
  task: Task;
} 
