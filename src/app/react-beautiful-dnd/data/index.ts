import { v4 as uuidv4 } from "uuid";

export type TaskT = {
  id: number | string;
  title: string;
  priority: number | string;
  //   description: string;
  //   deadline: number;
  //   image?: string;
  //   alt?: string;
  //   tags: { title: string; bg: string; text: string }[];
};

type Column = {
  name: string;
  items: TaskT[];
};

// export type Columns = {
//   [key: string]: Column;
// };

export const BoardData: Column[] = [
  {
    name: "Backlog",
    items: [
      {
        id: 1,
        priority: 0,
        title: "Company website redesign.",
      },
      {
        id: 2,
        priority: 2,
        title: "Mobile app login process prototype.",
      },
    ],
  },
  {
    name: "In Progress",
    items: [
      {
        id: 3,
        priority: 1,
        title: "Research and strategy for upcoming project.",
      },
    ],
  },
  {
    name: "In Review",
    items: [
      {
        id: 4,
        priority: 2,
        title: "Dashboard layout redesign.",
      },
      {
        id: 5,
        priority: 0,
        title: "Social media posts",
      },
    ],
  },
  {
    name: "Completed",
    items: [
      {
        id: 6,
        priority: 0,
        title: "Review client spec document and give feedback.",
      },
      {
        id: 7,
        priority: 1,
        title: "Navigation designs",
      },
      {
        id: 8,
        priority: 2,
        title: "Create style guide based on previous feedback",
      },
    ],
  },
];
