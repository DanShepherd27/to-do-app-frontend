"use client";
import React, { useState } from "react";
import * as S from "./UserCreationAtoms";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface FormValues {
  username: string;
}

const inititalValues: FormValues = { username: "" };

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(35, "Name too long")
    .matches(/^[A-Za-z,.'-]*$/, "Special characters are not allowed"),
});

export const UserCreation = () => {
  const router = useRouter();
  const cookies = useCookies();

  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("Submitted." + JSON.stringify(values));
    cookies.set("username", values.username);
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
