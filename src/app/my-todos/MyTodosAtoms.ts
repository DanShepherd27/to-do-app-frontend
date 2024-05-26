import styled from "styled-components";
import { IconButton } from "@fluentui/react/lib/Button";
import * as F from "formik";

export const MyTodosWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 24px;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 70vh;
  margin-bottom: 50px;
  margin-top: 20px;
`;

export const TodoCard = styled.div`
  width: calc(100% - 20px);
  height: 50px;
  border-radius: 5px;
  background-color: rgb(var(--secondary-rgb));
  color: rgb(var(--primary-rgb));
  display: flex;
  padding: 13px 20px;
  margin: 10px;
`;

export const Form = styled(F.Form)`
  display: flex;
  justify-content: center;
`;

export const Field = styled(F.Field)`
  position: absolute;
  bottom: 50px;
  width: calc(100% - 20px);
  max-width: 780px;
  height: 50px;
  border: 1px solid rgb(var(--primary-rgb));
  border-radius: 5px;
  background-color: rgb(var(--background-rgb));
  color: rgb(var(--primary-rgb));
  padding: 0 20px;

  &:focus {
    outline: 3px solid rgb(var(--primary-rgb));
  }
`;

export const Button = styled(IconButton)`
  height: 24px;
  width: 24px;
  color: rgb(var(--primary-rgb));
  border-radius: 5px;

  &:hover {
    background-color: rgb(var(--primary-rgb));
    color: rgb(var(--secondary-rgb));
  }
`;
