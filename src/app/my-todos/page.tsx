"use client";
import { useEffect, useMemo } from "react";
import { useCookies } from "next-client-cookies";
import { TodoCard } from "../components/TodoCard/TodoCard";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { useTodosStore } from "../store/todos.store";
import * as S from "./MyTodosAtoms";

export default function MyTodos() {
  const { todos, fetchTodos } = useTodosStore();
  useMemo(() => {
    initializeIcons();
  }, []);

  const cookies = useCookies();

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [fetchTodos]);

  return (
    <S.MyTodosWrapper>
      <S.FlexDiv>Hello, {cookies.get("username")}!</S.FlexDiv>
      <S.FlexDiv>
        <S.MyTodosContainer>
          {todos &&
            todos
              .filter((todo) => !todo.done)
              .map((todo) => <TodoCard key={todo.id} todo={todo} />)}
        </S.MyTodosContainer>
        <S.MyTodosContainer>
          {todos &&
            todos
              .filter((todo) => todo.done)
              .map((todo) => <TodoCard key={todo.id} todo={todo} />)}
        </S.MyTodosContainer>
      </S.FlexDiv>
      <S.Field />
    </S.MyTodosWrapper>
  );
}
