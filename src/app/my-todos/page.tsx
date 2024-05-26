"use client";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { useTodosStore } from "../store/todos.store";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as S from "./MyTodosAtoms";
import { Todo } from "../models/Todo";
import { User } from "../models/User";
import * as api from "../../api/api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodosContainers } from "../components/TodosContainers/TodosContainers";

initializeIcons();

interface FormValues {
  title: string;
}

const inititalValues: FormValues = { title: "" };

const validationSchema = Yup.object({
  title: Yup.string().required("Can't leave it empty"),
});

export default function MyTodos() {
  const { todos, softDeletedTodos, fetchTodos, addTodo, resetSoftDeleteTodos } =
    useTodosStore();

  const cookies = useCookies();
  const [user, setUser] = useState(new User(""));

  useEffect(() => {
    if (cookies.get("user")) {
      setUser(JSON.parse(cookies.get("user")!));
    }
  }, [cookies]);

  function handleSubmit(
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) {
    addTodo(new Todo(user, values.title, false, 0));
    resetForm();
    setSubmitting(false);
  }

  function handleSync() {
    (async () => {
      try {
        await api.syncTodos(todos, softDeletedTodos);
        toast.success("Sync successful.");
        resetSoftDeleteTodos();
      } catch {
        toast.error("Sync failed.");
      }
    })();
  }

  return (
    <S.MyTodosWrapper>
      <S.FlexDiv>Hello, {user.username}!</S.FlexDiv>
      <S.FlexDiv>
        <TodosContainers user={user} />
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
