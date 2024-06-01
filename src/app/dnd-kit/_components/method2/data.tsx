import {
  Active,
  DataRef,
  DroppableContainer,
  KeyboardCode,
  KeyboardCoordinateGetter,
  Over,
  closestCorners,
  getFirstCollision,
} from "@dnd-kit/core";
import { Column, ColumnDragData } from "./Column";
import { TaskDragData } from "./TaskCard";

// ***********************
// data
// ***********************
const defaultCols = [
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
] satisfies Column[];

export const initialTasks: Task[] = [
  {
    id: "task1",
    columnId: "done",
    content: "Project initiation and planning",
  },
  {
    id: "task2",
    columnId: "done",
    content: "Gather requirements from stakeholders",
  },
  {
    id: "task3",
    columnId: "done",
    content: "Create wireframes and mockups",
  },
  {
    id: "task4",
    columnId: "in-progress",
    content: "Develop homepage layout",
  },
  {
    id: "task5",
    columnId: "in-progress",
    content: "Design color scheme and typography",
  },
  {
    id: "task6",
    columnId: "todo",
    content: "Implement user authentication",
  },
  {
    id: "task7",
    columnId: "todo",
    content: "Build contact us page",
  },
  {
    id: "task8",
    columnId: "todo",
    content: "Create product catalog",
  },
  {
    id: "task9",
    columnId: "todo",
    content: "Develop about us page",
  },
  {
    id: "task10",
    columnId: "todo",
    content: "Optimize website for mobile devices",
  },
  {
    id: "task11",
    columnId: "todo",
    content: "Integrate payment gateway",
  },
  {
    id: "task12",
    columnId: "todo",
    content: "Perform testing and bug fixing",
  },
  {
    id: "task13",
    columnId: "todo",
    content: "Launch website and deploy to server",
  },
];

const directions: string[] = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left,
];

// ***********************
// types and interfaces
// ***********************
export type ColumnId = (typeof defaultCols)[number]["id"];

export interface Task {
  id: string;
  columnId: ColumnId;
  content: string;
}

// ***********************
// utils
// ***********************
export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<ColumnDragData | TaskDragData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}

export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      const data = entry.data.current;

      if (data) {
        const { type, children } = data;

        if (type === "Column" && children?.length > 0) {
          if (active.data.current?.type !== "Column") {
            return;
          }
        }
      }

      switch (event.code) {
        case KeyboardCode.Down:
          if (active.data.current?.type === "Column") {
            return;
          }
          if (collisionRect.top < rect.top) {
            // find all droppable areas below
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (active.data.current?.type === "Column") {
            return;
          }
          if (collisionRect.top > rect.top) {
            // find all droppable areas above
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            // find all droppable areas to left
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          // find all droppable areas to right
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, "id");

    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        return {
          x: newRect.left,
          y: newRect.top,
        };
      }
    }
  }

  return undefined;
};
