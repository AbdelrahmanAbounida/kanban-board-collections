"use client";
import React, { useState } from "react";
import TasksContainer from "../../components/global/tasks-card";
import { useDndStore } from "@/store";

const DndKit = () => {
  //   const [allContainers, setallContainers] = useState<TaskContainer[]>([]);
  const { allTasksContainers } = useDndStore();
  return (
    <div className="flex items-center gap-3 overflow-x-auto w-full m-auto  justify-center p-7 mt-12">
      {/* {allTasksContainers.map((container, index) => (
        <TasksContainer key={index} container={container} />
      ))} */}
    </div>
  );
};

export default DndKit;
