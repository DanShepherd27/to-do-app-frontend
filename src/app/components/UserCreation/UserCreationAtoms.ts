"use client";
import styled from "styled-components";
import * as F from "formik";

export const UserCreationWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const Form = styled(F.Form)`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  width: 500px;
  max-width: 80%;
  margin-bottom: 20px;
`;

export const Field = styled(F.Field)`
  width: 500px;
  max-width: 80%;
  height: 50px;
  border: 1px solid rgb(var(--primary-rgb));
  border-radius: 5px;
  background-color: rgb(var(--background-rgb));
  color: rgb(var(--primary-rgb));
  padding: 0 10px;

  &:focus {
    outline: 3px solid rgb(var(--primary-rgb));
  }
`;

export const ErrorMessage = styled(F.ErrorMessage)`
  margin-top: 8px;
  font-size: calc(var(--default-font-size) - 8px);
  color: rgb(var(--error-rgb));
`;

export const SubmitButton = styled.button<{ $disabled?: boolean }>`
  width: 150px;
  max-width: 80%;
  height: 50px;
  border: ${({ disabled }) =>
    disabled
      ? "3px solid rgb(var(--active-secondary-rgb))"
      : "3px solid rgb(var(--primary-rgb))"};
  border-radius: 7px;
  background-color: ${({ disabled }) =>
    disabled ? "rgb(var(--secondary-rgb))" : "transparent"};
  color: ${({ disabled }) =>
    disabled ? "rgb(var(--active-secondary-rgb))" : "rgb(var(--primary-rgb))"};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    border: ${({ disabled }) =>
      disabled ? "" : "3px solid rgb(var(--active-primary-rgb))"};
    color: ${({ disabled }) =>
      disabled ? "" : "rgb(var(--active-primary-rgb))"};
  }

  &:active {
    width: ${({ disabled }) => (disabled ? "" : "145px")};
    max-width: ${({ disabled }) => (disabled ? "" : "75%")};
    font-size: ${({ disabled }) =>
      disabled ? "" : "calc(var(--default-font-size) - 1px)"};
    margin-top: ${({ disabled }) => (disabled ? "" : "5px")};
  }
`;
