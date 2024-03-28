import React from "react";
import { initialTasks } from "../data";
import TaskCard from "@/components/global/tasks-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ReactBeautifulDnd = () => {
  return (
    <div className="flex items-start justify-between p-3 gap-3 overflow-auto ">
      {initialTasks.map((taskContainer, index) => (
        <div key={index} className="flex flex-col gap-2 w-[350px] relative ">
          <div className="p-3 bg-red-50 rounded-md text-red-500  inset-y-0 top-0 ">
            {taskContainer.title}
          </div>

          {/** cards */}
          {taskContainer.tasks.map((task, i) => (
            <TaskCard key={i} task={task} />
          ))}
          {/** add task modal */}
          <Button>
            <PlusIcon className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ReactBeautifulDnd;
