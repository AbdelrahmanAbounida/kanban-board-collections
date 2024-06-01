import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DndContextProps,
  DragOverlay,
  DraggableSyntheticListeners,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  SortableContextProps,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Slot, SlotProps } from "@radix-ui/react-slot";
// import { DropAnimation } from "@hello-pangea/dnd";
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";

// 1- define task/item interface
export interface Task {
  id: any;
  description: string;
}

// 2- define sorable container interface
export interface SortableProps<T extends Task> extends SortableContextProps {
  /**
   * @example
   * valu = {[
   * {id: 1, name: 'asd'},
   * {id: 2, name: 'dfg'}
   * ]}
   */
  taskItems: T[];

  /**
   *
   * An optional callblack that is called when the order of the data items changes
   * it recieves the new array of items as ites args
   *
   * @example
   * onValueChange={(items)=>console.log({items})}
   */
  onValueChange?: (newItemsAfterChange: T[]) => void;

  /**
   * An optional callback function that is called when an item is moved
   * @type (event: { activeIndex: number; overIndex: number }) => void
   * @example
   * onMove={(event) => console.log(`Item moved from index ${event.activeIndex} to index ${event.overIndex}`)}
   */
  onMove?: (event: { activeIndex: number; overIndex: number }) => void;

  /**
   * A collision detection strategy that will be used to determine the closest sortable item.
   * @default closestCenter
   * @type DndContextProps["collisionDetection"]
   */
  collisionDetection?: DndContextProps["collisionDetection"];

  /**
   * An array of modifiers that will be used to modify the behavior of the sortable component.
   * @default
   * [restrictToVerticalAxis, restrictToParentElement]
   * @type Modifier[]
   */
  modifiers?: DndContextProps["modifiers"];

  /**
   * A sorting strategy that will be used to determine the new order of the data items.
   * @default verticalListSortingStrategy
   * @type SortableContextProps["strategy"]
   */
  strategy?: SortableContextProps["strategy"];

  /**
   * An optional React node that is rendered on top of the sortable component.
   * It can be used to display additional information or controls.
   * @default null
   * @type React.ReactNode | null
   * @example
   * overlay={<Skeleton className="w-full h-8" />}
   */
  // to customize the appearance of the current active dragged item
  overlay?: React.ReactNode | null;
}

// *****************************
// 1- SortableList
// *****************************
const SortableList = <T extends Task>({
  taskItems,
  onValueChange,
  collisionDetection = closestCenter,
  modifiers = [restrictToVerticalAxis, restrictToParentElement],
  strategy = verticalListSortingStrategy,
  onMove,
  children,
  overlay,
  ...props
}: SortableProps<T>) => {
  // 3- load sensors hooks
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // 4- current active task
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  return (
    // global drag context
    <DndContext
      modifiers={modifiers}
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = taskItems.findIndex(
            (item) => item.id === active.id
          );
          const overIndex = taskItems.findIndex((item) => item.id === over.id);

          if (onMove) {
            onMove({ activeIndex, overIndex });
          } else {
            onValueChange?.(arrayMove(taskItems, activeIndex, overIndex));
          }
        }
        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
      collisionDetection={collisionDetection}
      {...props}
    >
      {/** sortable context */}
      <SortableContext items={taskItems} strategy={strategy}>
        {children}
      </SortableContext>

      {overlay ? (
        <SortableOverlay activeId={activeId}>{overlay}</SortableOverlay>
      ) : null}
    </DndContext>
  );
};

// *****************************
// 2- SortableItem
// *****************************

// Helper interfaces and methods
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
type PossibleRef<T> = React.Ref<T> | undefined;
/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

interface SortableItemContextProps {
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: DraggableSyntheticListeners | undefined;
}

const SortableItemContext = createContext<SortableItemContextProps>({
  attributes: {},
  listeners: undefined,
});

interface SortableItemProps extends SlotProps {
  value: UniqueIdentifier;
  asChild?: boolean;
}

const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ asChild, className, value, ...props }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: value });

    const context = useMemo(
      () => ({
        attributes,
        listeners,
      }),
      [attributes, listeners]
    );

    const toCSSTransform = (transform: any) => {
      if (!transform) return;
      const { x, y } = transform;
      return `translate3d(${x}px, ${y}px, 0)`;
    };

    const style: React.CSSProperties = {
      opacity: isDragging ? 0.4 : undefined,
      transform: toCSSTransform(transform),
      transition,
    };

    const Comp = asChild ? Slot : "div";

    return (
      <SortableItemContext.Provider value={context}>
        <Comp
          className={cn(isDragging && "cursor-grabbing", className)}
          ref={composeRefs(ref, setNodeRef as React.Ref<HTMLDivElement>)}
          style={style}
          {...props}
        />
      </SortableItemContext.Provider>
    );
  }
);
SortableItem.displayName = "SortableItem";

// *****************************
// 3- SortableOverlay
// *****************************

//  to customize the appearance of the current active dragged item
const dropAnimationOpts: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface SortableOverlayProps
  extends React.ComponentPropsWithRef<typeof DragOverlay> {
  activeId?: UniqueIdentifier | null;
}

const SortableOverlay = ({
  activeId,
  dropAnimation = dropAnimationOpts,
  children,
  ...props
}: SortableOverlayProps) => {
  return (
    <DragOverlay dropAnimation={dropAnimation} {...props}>
      {activeId ? (
        <SortableItem value={activeId} asChild>
          {children}
        </SortableItem>
      ) : null}
    </DragOverlay>
  );
};

// *****************************
// 4- Handle Drag
// *****************************
const useSortableItem = () => {
  const context = useContext(SortableItemContext);

  if (!context) {
    throw new Error("useSortableItem must be used within a SortableItem");
  }

  return context;
};

interface SortableDragHandleProps extends ButtonProps {
  withHandle?: boolean;
}
const SortableDragHandle = forwardRef<
  HTMLButtonElement,
  SortableDragHandleProps
>(({ className, ...props }, ref) => {
  const { attributes, listeners } = useSortableItem();

  return (
    <Button
      ref={composeRefs(ref)}
      className={cn("cursor-grab", className)}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
});
SortableDragHandle.displayName = "SortableDragHandle";

export { SortableList, SortableItem, SortableOverlay, SortableDragHandle };
