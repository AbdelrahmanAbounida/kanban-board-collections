import { Task } from "@/app/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

const TaskCard = ({ task, provided }: { task: Task; provided: any }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="relative w-full "
    >
      <Card className="  ">
        <CardContent className="flex items-center flex-col w-full p-1 overflow-auto max-h-[400px]">
          <div className="my-2 bg-slate-300 rounded-md text-md w-full p-2">
            {task.description}
          </div>
        </CardContent>
      </Card>
      {/* <div className=" inset-0 bottom-0 absolute ">
        <Button className="w-full ">
          <PlusCircledIcon className="w-5 h-5" />
          Add Task
        </Button>
      </div> */}
    </div>
  );
};

export default TaskCard;
