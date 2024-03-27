import React, { useState } from "react";

export interface Task {
  description: string;
}

export interface TaskContainer {
  tasks: Task[];
  title: string;
}

const AllContainers = () => {
  const [allContainers, setallContainers] = useState<TaskContainer[]>([]);

  return <div className="flex items-center gap-3 overflow-x-auto"></div>;
};

export default AllContainers;
