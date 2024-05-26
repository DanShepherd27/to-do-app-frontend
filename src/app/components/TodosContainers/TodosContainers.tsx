import { Todo } from "@/app/models/Todo";
import * as S from "./TodosContainersAtoms";
import { useTodosStore } from "../../store/todos.store";
import { act, useEffect, useState } from "react";
import { User } from "@/app/models/User";
import { toast } from "react-toastify";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoCard } from "../TodoCard/TodoCard";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";

interface TodosContainerProps {
  user: User;
}

export const TodosContainers = ({ user }: TodosContainerProps) => {
  const { todos, fetchTodos } = useTodosStore();
  const [pending, setPending] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [transferOverContainer, setTransferOverContainer] =
    useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (user.username !== "") {
          await fetchTodos(user.id);
        }
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("Unknown error.");
        }
      }
    })();
  }, [fetchTodos, user]);

  useEffect(() => {
    setPending(
      todos.filter((todo) => !todo.done).sort((a, b) => a.index - b.index)
    );
    setDone(
      todos.filter((todo) => todo.done).sort((a, b) => a.index - b.index)
    );
  }, [todos]);

  const getPendingPos = (id: UniqueIdentifier) =>
    pending.findIndex((todo) => todo.id === id);

  const getDonePos = (id: UniqueIdentifier) =>
    done.findIndex((todo) => todo.id === id);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    const overId = over?.id;
    if (overId == null || active.id === overId) return;

    const activeContainer = active?.data?.current?.sortable.containerId;
    const overContainer = over?.data?.current?.sortable.containerId;

    if (activeContainer === overContainer) {
      // If items are being moved within the same container
      if (active.id !== overId) {
        if (activeContainer === "Pending") {
          setPending((items) => {
            const oldIndex = items.indexOf(
              pending.find((p) => p.id === active.id)!
            );
            const newIndex = items.indexOf(
              pending.find((p) => p.id === overId)!
            );
            const newArray = arrayMove(items, oldIndex, newIndex);

            for (let i = 0; i < newArray.length; i++) {
              newArray[i].index = i;
            }

            return newArray;
          });
        } else {
          setDone((items) => {
            const oldIndex = items.indexOf(
              done.find((p) => p.id === active.id)!
            );
            const newIndex = items.indexOf(done.find((p) => p.id === overId)!);
            const newArray = arrayMove(items, oldIndex, newIndex);

            for (let i = 0; i < newArray.length; i++) {
              newArray[i].index = i;
            }

            return newArray;
          });
        }
      }
    } else {
      // If items are being moved between different containers
      const item = todos.find((item) => item.id === active.id)!;
      if (activeContainer === "Pending") {
        item.done = true;
        setPending((items) => {
          const newArray = items.filter((item) => item.id !== active.id);
          for (let i = 0; i < newArray.length; i++) {
            newArray[i].index = i;
          }
          return newArray;
        });
        setDone((items) => {
          const newArray = [...items, item];
          for (let i = 0; i < newArray.length; i++) {
            newArray[i].index = i;
          }
          return newArray;
        });
      } else {
        item.done = false;
        setDone((items) => {
          const newArray = items.filter((item) => item.id !== active.id);
          for (let i = 0; i < newArray.length; i++) {
            newArray[i].index = i;
          }
          return newArray;
        });
        setPending((items) => {
          const newArray = [...items, item];
          for (let i = 0; i < newArray.length; i++) {
            newArray[i].index = i;
          }
          return newArray;
        });
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (
      active?.data?.current?.sortable.containerId !==
      over?.data?.current?.sortable.containerId
    ) {
      setTransferOverContainer(over?.data?.current?.sortable.containerId);
    } else {
      setTransferOverContainer(null);
    }
    setActiveId(active.id);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <S.TodosContainer>
        <SortableContext
          items={pending}
          strategy={verticalListSortingStrategy}
          id="Pending"
        >
          {pending.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              placeholder={todo.id === activeId}
            />
          ))}
          {activeId &&
            (pending.length === 0 || transferOverContainer === "Pending") && (
              <TodoCard
                key="placeholder-card-pending"
                todo={{
                  ...todos.find((t) => t.id === activeId)!,
                  id: uuidv4() as UUID,
                }}
                placeholder={true}
              />
            )}
        </SortableContext>
      </S.TodosContainer>
      <S.TodosContainer>
        <SortableContext
          items={done}
          strategy={verticalListSortingStrategy}
          id="Done"
        >
          {done.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
          {activeId &&
            (done.length === 0 || transferOverContainer === "Done") && (
              <TodoCard
                key="placeholder-card-done"
                todo={{
                  ...todos.find((t) => t.id === activeId)!,
                  id: uuidv4() as UUID,
                }}
                placeholder={true}
              />
            )}
        </SortableContext>
      </S.TodosContainer>
      <DragOverlay>
        {activeId && (
          <TodoCard
            todo={todos.find((t) => t.id === activeId)!}
            dragOverlay={true}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
