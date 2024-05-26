import { Todo } from "@/app/models/Todo";
import * as S from "./TodosContainersAtoms";
import { useTodosStore } from "../../store/todos.store";
import { useEffect, useState } from "react";
import { User } from "@/app/models/User";
import { toast } from "react-toastify";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoCard } from "../TodoCard/TodoCard";

interface TodosContainerProps {
  user: User;
}

export const TodosContainers = ({ user }: TodosContainerProps) => {
  const { todos, fetchTodos } = useTodosStore();
  const [pending, setPending] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);

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
    setPending(todos.filter((todo) => !todo.done));
    setDone(todos.filter((todo) => todo.done));
  }, [todos]);

  const getPendingPos = (id: UniqueIdentifier) =>
    pending.findIndex((todo) => todo.id === id);

  const getDonePos = (id: UniqueIdentifier) =>
    done.findIndex((todo) => todo.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const overId = over?.id;
    if (overId == null || active.id === overId) return;

    const activeContainerId = active?.data?.current?.sortable.containerId;
    const overContainerId = over?.data?.current?.sortable.containerId;

    if (activeContainerId === overContainerId) {
      if (overContainerId === "Sortable-0") {
        setPending(() => {
          const originalPos = getPendingPos(active.id);
          const newPos = getPendingPos(overId);
          return arrayMove(pending, originalPos, newPos);
        });
      }

      if (overContainerId === "Sortable-1") {
        setDone(() => {
          const originalPos = getDonePos(active.id);
          const newPos = getDonePos(overId);
          return arrayMove(done, originalPos, newPos);
        });
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;
    if (overId == null || active.id === overId) return;
    console.log(event.active);
    console.log(event.over);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <S.TodosContainer>
        <SortableContext items={pending} strategy={verticalListSortingStrategy}>
          {pending.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </S.TodosContainer>
      <S.TodosContainer>
        <SortableContext items={done} strategy={verticalListSortingStrategy}>
          {done.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </S.TodosContainer>
    </DndContext>
  );
};
