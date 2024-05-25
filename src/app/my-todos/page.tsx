"use client";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "next-client-cookies";
import { TodoCard } from "../components/TodoCard/TodoCard";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { useTodosStore } from "../store/todos.store";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as S from "./MyTodosAtoms";
import { Todo } from "../models/Todo";
import { User } from "../models/User";
import * as api from "../../api/api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  title: string;
}

const inititalValues: FormValues = { title: "" };

const validationSchema = Yup.object({
  title: Yup.string().required("Can't leave it empty"),
});

export default function MyTodos() {
  const { todos, softDeletedTodos, fetchTodos, addTodo } = useTodosStore();

  useMemo(() => {
    initializeIcons();
  }, []);

  const cookies = useCookies();
  const [user, setUser] = useState(new User(""));

  useEffect(() => {
    if (cookies.get("user")) {
      setUser(JSON.parse(cookies.get("user")!));
    }
  }, [cookies]);

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

  function handleSubmit(
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) {
    addTodo(new Todo(user, values.title, false));
    resetForm();
    setSubmitting(false);
  }

  function handleSync() {
    (async () => {
      try {
        await api.syncTodos(todos, softDeletedTodos);
        toast.success("Sync successful.");
      } catch {
        toast.error("Sync failed.");
      }
    })();
  }

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
                e.preventDefault();
                submitForm();
              }
            }}
          >
            <S.Button
              onClick={handleSync}
              iconProps={{ iconName: "Sync" }}
              title="Sync to cloud"
              ariaLabel="Sync to cloud"
            />
            <S.Field
              id="title"
              name="title"
              placeholder="new todo"
              autoComplete="off"
            />
          </S.Form>
        )}
      </Formik>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </S.MyTodosWrapper>
  );
}
