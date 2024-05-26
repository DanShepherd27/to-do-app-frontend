import { useTodosStore } from "@/app/store/todos.store";
import * as S from "./TodoCardAtoms";
import { Todo } from "@/app/models/Todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UUID } from "crypto";

interface TodoProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoProps> = ({ todo }) => {
  const { softDeleteTodo, updateTodo } = useTodosStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <S.TodoCard>
        <S.TodoTitle $done={todo.done}>{todo.title}</S.TodoTitle>
        {!todo.done && (
          <S.Button
            onClick={() => {
              updateTodo({ ...todo, done: true });
            }}
            iconProps={{ iconName: "Accept" }}
            title="Done"
            ariaLabel="Done"
          />
        )}
        {todo.done && (
          <S.Button
            onClick={() => softDeleteTodo(todo)}
            iconProps={{ iconName: "Cancel" }}
            title="Delete"
            ariaLabel="Delete"
          />
        )}
      </S.TodoCard>
    </div>
  );
};
