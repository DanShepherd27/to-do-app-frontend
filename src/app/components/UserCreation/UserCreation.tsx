"use client";
import React, { useState } from "react";
import * as S from "./UserCreationAtoms";

export const UserCreation = () => {
  const handleSubmit = () => {
    console.log("Submitted.");
  };

  return (
    <S.UserCreationWrapper>
      <S.UserCreationContainer>
        <S.TitleText>Name</S.TitleText>
        <S.UsernameInput placeholder="Your name" />
        <S.SubmitButton onClick={handleSubmit}>Submit</S.SubmitButton>
      </S.UserCreationContainer>
    </S.UserCreationWrapper>
  );
};
