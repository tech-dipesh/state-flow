"use client";
import type { Task, TaskPriority } from "@/types/task";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { dataContext } from "@context";

interface OptionType {
  id: string;
  urgency: TaskPriority;
}
export default function Option({ id, urgency }: OptionType) {
  const { tasks, setTasks } = dataContext();
  const [option, setoption] = useState(false);
  const [selectOption, setSelectOption] = useState<TaskPriority>(urgency as TaskPriority);

  const allOptions = [
    { priority: "Low", icon: faCaretDown, color: "bg-blue-400" },
    { priority: "Medium", icon: faGripLines, color: "bg-blue-500" },
    { priority: "High", icon: faCaretUp, color: "bg-blue-600" },
  ]       as const

  const selectThatOption = allOptions.filter(
    (f) => f.priority === selectOption,
  );

  return (
    <div className="relative w-56">
      <button
        onClick={() => setoption(!option)}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-blue-500 flex items-center justify-between cursor-pointer"
      >
        {selectOption}
        <span>
          <FontAwesomeIcon icon={selectThatOption[0]?.icon} />
        </span>
      </button>
      {option && (
        <div className="absolute top-full left-0 w-full mt-2 bg-gray-800 rounded-lg border border-gray-700 z-50">
          {allOptions.map((option) => (
            <button
              className={`${option.priority === selectOption ? "bg-blue-900" : option.color} w-full px-4 py-3 text-left flex items-center gap-2 cursor-pointer`}
              onClick={() => {
                setoption(!option);
                setSelectOption(option.priority);
                setTasks(
                  tasks.map((task) =>
                    task.id === id
                      ? { ...task, priority: option.priority }
                      : task,
                  ),
                );
              }}
              key={option.color}
            >
              {option.priority}{" "}
              <span>
                <FontAwesomeIcon icon={option.icon} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
