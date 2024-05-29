import { useTodosStore } from "@/app/store/todos.store";
import * as S from "./TodoCardAtoms";
import { Todo } from "@/app/models/Todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoProps {
  todo: Todo;
  placeholder?: boolean;
  dragOverlay?: boolean;
}

export const TodoCard: React.FC<TodoProps> = ({
  todo,
  placeholder,
  dragOverlay,
}) => {
  const { softDeleteTodo, updateTodo } = useTodosStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div ref={setNodeRef} style={style}>
      <S.TodoCard
        $placeholder={placeholder ?? false}
        $dragOverlay={dragOverlay}
      >
        <S.DragHandle {...attributes} {...listeners}>
          <S.TodoTitle $done={todo.done}>{todo.title}</S.TodoTitle>
        </S.DragHandle>
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
