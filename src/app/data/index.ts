import { TaskContainer } from "./types";
import { v4 as uuidv4 } from "uuid";

export const initialTasks: TaskContainer[] = [
  {
    title: "Todo",
    tasks: [
      {
        id: uuidv4(),
        description: "C#-React",
      },
      {
        id: uuidv4(),
        description: "ReactNative",
      },
      {
        id: uuidv4(),
        description: "Flutter",
      },
      {
        id: uuidv4(),
        description: "Wordpress",
      },
      {
        id: uuidv4(),
        description: "Golang",
      },
      {
        id: uuidv4(),
        description: "php",
      },
      {
        id: uuidv4(),
        description: "VueJS",
      },
      {
        id: uuidv4(),
        description: "Pytorch",
      },
    ],
  },
  {
    title: "Inprogress",
    tasks: [
      {
        id: uuidv4(),
        description: "Deep Learning",
      },
      {
        id: uuidv4(),
        description: "TimeSeries",
      },
      {
        id: uuidv4(),
        description: "Coursera Courses",
      },
    ],
  },
  {
    title: "Done",
    tasks: [],
  },
];
