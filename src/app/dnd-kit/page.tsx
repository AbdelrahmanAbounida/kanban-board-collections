"use client";
import React, { useState } from "react";
import { useDndStore } from "@/store";
import { v4 as uuidv4 } from "uuid";
import {
  SortableDragHandle,
  SortableItem,
  SortableList,
  Task,
} from "./_components/method1/sortabble";
import { Skeleton } from "@/components/ui/skeleton";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanBoard } from "./_components/method2/Board";
import Method3List from "./_components/method3/main";

const DndKit = () => {
  //   const [allContainers, setallContainers] = useState<TaskContainer[]>([]);
  const { allTasksContainers } = useDndStore();

  const tasks: Task[] = [
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
  ];

  const [allTasks, setAllTasks] = useState(tasks);

  return (
    <div className=" h-full dark:text-white">
      <h1 className="flex items-center justify-center mt-5 font-bold text-2xl">
        DND Kit
      </h1>
      <div className="flex flex-col items-center gap-3 overflow-x-auto w-full m-auto  justify-center p-7 mt-12">
        {/* {allTasksContainers.map((container, index) => (
        <TasksContainer key={index} container={container} />
      ))} */}

        {/** Method1 */}
        <h1 className="text-3xl font-extrabold ">Method (1)</h1>
        <SortableList
          taskItems={allTasks}
          items={allTasks}
          onMove={({ activeIndex, overIndex }) => {
            // update list order
            setAllTasks((items) => {
              return arrayMove(items, activeIndex, overIndex);
            });
          }}
          overlay={
            <div className="flex">
              <Skeleton className="h-8 w-full rounded-sm border" />
              {/* <Skeleton className="h-8 w-full rounded-sm" /> */}
              {/* <Skeleton className="size-8 shrink-0 rounded-sm" /> */}
              {/* <Skeleton className="size-8 shrink-0 rounded-sm" /> */}
            </div>
          }
        >
          <div className="w-full space-y-2">
            {allTasks.map((field, index) => (
              <SortableItem
                className="flex items-center  w-full mx-auto"
                key={field.id}
                value={field.id}
                asChild
              >
                <div className="flex items-center justify-between max-w-2xl border items-center gap-2">
                  <SortableDragHandle
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                  >
                    <DragHandleDots2Icon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </SortableDragHandle>
                  <div className="text-md">{field.description}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => console.log(index)}
                  >
                    <TrashIcon
                      className="size-4 text-destructive"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableList>

        {/** Method2 */}
        <h1 className="text-3xl font-extrabold ">Method (2)</h1>
        <KanbanBoard />

        {/** Method3 */}
        <h1 className="text-3xl font-extrabold ">Method (3)</h1>
        <Method3List />
      </div>
    </div>
  );
};

export default DndKit;
