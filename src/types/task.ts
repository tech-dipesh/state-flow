export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  date: string;
  labels?: string[];
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

