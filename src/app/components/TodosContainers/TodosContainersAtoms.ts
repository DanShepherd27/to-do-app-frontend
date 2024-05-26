import styled from "styled-components";

export const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid rgb(var(--secondary-rgb));
  width: calc(100% - 10px);
  max-width: 800px;
  min-height: 55px;
  max-height: 30vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  margin-bottom: 10px;
`;
