import styled from "styled-components";
import { IconButton } from "@fluentui/react/lib/Button";

export const TodoCard = styled.div<{
  $placeholder: boolean;
  $dragOverlay?: boolean;
}>`
  width: 98%;
  height: 50px;
  border-radius: 5px;
  background-color: rgba(
    var(--secondary-rgb),
    ${({ $placeholder }) => ($placeholder ? 0.2 : 1)}
  );
  color: rgb(var(--primary-rgb));
  display: flex;
  margin: 1%;
  border: ${({ $dragOverlay }) =>
    $dragOverlay ? "1px solid rgb(var(--primary-rgb))" : "none"};
`;

export const TodoTitle = styled.div<{ $done: boolean }>`
  padding-left: 20px;
  width: 100%;
  text-decoration: ${({ $done }) => ($done ? "line-through" : "")};
  color: ${({ $done }) =>
    $done ? "rgb(var(--active-secondary-rgb))" : "white"};
`;

export const Button = styled(IconButton)`
  height: 24px;
  width: 24px;
  margin-top: 13px;
  margin-right: 20px;
  color: rgb(var(--primary-rgb));
  border-radius: 5px;

  &:hover {
    background-color: rgb(var(--primary-rgb));
    color: rgb(var(--secondary-rgb));
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;
