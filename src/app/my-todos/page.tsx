"use client";
import { useEffect, useMemo } from "react";
import { useCookies } from "next-client-cookies";
import { TodoCard } from "../components/TodoCard/TodoCard";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { useTodosStore } from "../store/todos.store";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as S from "./MyTodosAtoms";
import { Todo } from "../models/Todo";
import { User } from "../models/User";

interface FormValues {
  title: string;
}

const inititalValues: FormValues = { title: "" };

const validationSchema = Yup.object({
  title: Yup.string().required("Can't leave it empty"),
});

export default function MyTodos() {
  const { todos, fetchTodos, addTodo } = useTodosStore();

  useMemo(() => {
    initializeIcons();
  }, []);

  const cookies = useCookies();

  const user = JSON.parse(cookies.get("user")!) as User;

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    addTodo(new Todo(user.id, values.title, false));
    resetForm();
    setSubmitting(false);
  };

  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, [fetchTodos]);

  return (
    <S.MyTodosWrapper>
      <S.FlexDiv>Hello, {user.username}!</S.FlexDiv>
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
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <S.Form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission behavior
                submitForm();
              }
            }}
          >
            <S.Field
              id="title"
              name="title"
              placeholder="new todo"
              autoComplete="off"
            />
          </S.Form>
        )}
      </Formik>
    </S.MyTodosWrapper>
  );
}
