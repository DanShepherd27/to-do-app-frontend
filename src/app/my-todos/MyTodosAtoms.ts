import styled from "styled-components";
import { IconButton } from "@fluentui/react/lib/Button";

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

export const MyTodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgb(var(--secondary-rgb));
  width: calc(100% - 10px);
  max-width: 800px;
  max-height: 30vh;
  overflow-y: scroll;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  scrollbar-width: none;
  margin-bottom: 10px;
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

export const TodoTitleInput = styled.input`
  width: 98%;
  max-width: 800px;
  height: 50px;
  background-color: rgb(var(--secondary-rgb));
  color: rgb(var(--primary-rgb));
  display: flex;
  padding: 13px 20px;
  margin: 1%;
`;

export const Field = styled.input`
  position: absolute;
  bottom: 50px;
  width: calc(100% - 20px);
  max-width: 780px;
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
