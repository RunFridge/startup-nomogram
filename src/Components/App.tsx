import React from "react";
import styled from "styled-components";
import GlobalStyle from "../globlaStyles";
import Calculator from "./Calculator";

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;
// STYLE END ====

function App() {
  return (
    <>
      <GlobalStyle />
      <Title>Startup Nomogram</Title>
      <Calculator />
    </>
  );
}

export default App;
