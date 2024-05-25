import { useTodosStore } from "@/app/store/todos.store";
import * as S from "./TodoCardAtoms";
import { Todo } from "@/app/models/Todo";

interface TodoProps {
  todo: Todo;
}

export const TodoCard: React.FC<TodoProps> = ({ todo }) => {
  const { softDeleteTodo, updateTodo } = useTodosStore();

  return (
    <S.TodoCard>
      <S.TodoTitle $done={todo.done}>{todo.title}</S.TodoTitle>
      {!todo.done && (
        <S.Button
          onClick={() => updateTodo({ ...todo, done: true })}
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
  );
};
