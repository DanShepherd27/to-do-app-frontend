"use client";
import React, { useState } from "react";
import * as S from "./UserCreationAtoms";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { User } from "@/app/models/User";
import * as api from "../../../api/api";

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

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const user = new User(values.username);
    cookies.set("user", JSON.stringify(user));
    api.createUser(user);
    resetForm();
    router.push("/my-todos");
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
    </S.UserCreationWrapper>
  );
};
