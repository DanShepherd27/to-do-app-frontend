import styled from "styled-components";
import { IconButton } from "@fluentui/react/lib/Button";

export const TodoCard = styled.div`
  width: 98%;
  height: 50px;
  border-radius: 5px;
  background-color: rgb(var(--secondary-rgb));
  color: rgb(var(--primary-rgb));
  display: flex;
  padding: 13px 20px;
  margin: 1%;
`;

export const TodoTitle = styled.div<{ $done: boolean }>`
  width: 100%;
  text-decoration: ${({ $done }) => ($done ? "line-through" : "")};
  color: ${({ $done }) =>
    $done ? "rgb(var(--active-secondary-rgb))" : "white"};
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
