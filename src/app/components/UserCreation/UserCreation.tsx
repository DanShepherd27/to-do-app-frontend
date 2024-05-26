"use client";
import React, { useEffect, useState } from "react";
import * as S from "./UserCreationAtoms";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/models/User";
import * as api from "../../../api/api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  username: string;
}

const inititalValues: FormValues = { username: "" };

// SEE: https://www.reddit.com/r/webdev/comments/9n0ac2/regex_for_eastern_european_alphabets/
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(35, "Name too long")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž,.'-]*$/,
      "Special characters are not allowed"
    ),
});

export const UserCreation = () => {
  const router = useRouter();
  const cookies = useCookies();

  const [user, setUser] = useState(new User(""));

  useEffect(() => {
    if (cookies.get("user")) {
      setUser(JSON.parse(cookies.get("user")!));
    }
  }, [cookies]);

  const handleSubmit = async (values: FormValues) => {
    const updatedUser = { ...user, username: values.username };
    setUser(updatedUser);

    try {
      await api.createOrUpdateUser(updatedUser);
      cookies.set("user", JSON.stringify(updatedUser));
      router.push("/my-todos");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Unknown error.");
      }
    }
  };

  return (
    <S.UserCreationWrapper>
      <Formik
        initialValues={inititalValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <S.Form>
            <S.Group>
              <S.Label htmlFor="username">Name</S.Label>
              <S.Field
                id="username"
                name="username"
                placeholder="Your name"
                autoComplete="off"
              />
              <S.ErrorMessage name="username" component="div" />
            </S.Group>
            <S.SubmitButton
              type="submit"
              disabled={
                !touched.username ||
                (!!errors.username && errors.username.length > 0)
              }
            >
              Submit
            </S.SubmitButton>
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
    </S.UserCreationWrapper>
  );
};
