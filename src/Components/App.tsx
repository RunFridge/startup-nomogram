import React from "react";
import styled from "styled-components";
import GlobalStyle from "../GloblaStyles";
import Calculator from "./Calculator";

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 50%;
  text-align: center;
  font-size: 2em;
  margin: 1em 0;
`;
// STYLE END ====

function App() {
  return (
    <>
      <GlobalStyle />
      <TitleWrapper>
        <Title>💸 스타트업 손익 계산기 💸</Title>
      </TitleWrapper>
      <Calculator />
      {/* <Calculator /> */}
    </>
  );
}

export default App;
