import { initialTasks } from "@/app/data";
import { TaskContainer } from "@/app/data/types";
import { create } from "zustand";

type Store = {
  allTasksContainers: TaskContainer[];
  updateAllTasksContainers: (newContainer: TaskContainer) => void;
};

export const useDndStore = create<Store>()((set) => ({
  allTasksContainers: initialTasks,
  updateAllTasksContainers: () => (newContainer: TaskContainer) => {
    set((state) => ({
      allTasksContainers: [...state.allTasksContainers, newContainer],
    }));
  },
}));

// const { count, inc } = useStore()
