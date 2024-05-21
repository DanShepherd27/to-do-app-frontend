"use client";
import React, { useState } from "react";
import * as S from "./UserCreationAtoms";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

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
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("Submitted." + JSON.stringify(values));
    resetForm();
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
