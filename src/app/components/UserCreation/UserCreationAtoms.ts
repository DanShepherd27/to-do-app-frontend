"use client";
import styled from "styled-components";

export const UserCreationWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const UserCreationContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
`;

export const TitleText = styled.div`
  width: 500px;
  max-width: 80%;
  margin-bottom: 20px;
`;

export const UsernameInput = styled.input`
  width: 500px;
  max-width: 80%;
  height: 50px;
  border: none;
  background-color: white;
  color: rgb(var(--primary-rgb));
  padding: 0 10px;
  margin-bottom: 80px;

  &:focus {
    outline: 3px solid rgb(var(--primary-rgb));
  }
`;

export const SubmitButton = styled.button`
  width: 150px;
  max-width: 80%;
  height: 50px;
  border: 3px solid rgb(var(--primary-rgb));
  border-radius: 7px;
  background-color: transparent;
  color: rgb(var(--primary-rgb));

  &:hover {
    cursor: pointer;
    border: 3px solid rgb(var(--active-primary-rgb));
    color: rgb(var(--active-primary-rgb));
  }

  &:active {
    width: 145px;
    max-width: 75%;
    font-size: calc(var(--default-font-size) - 1px);
    margin-top: 5px;
  }
`;
