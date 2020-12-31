import React from "react";
import styled from "styled-components";
import Calculator from "./Calculator";

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;
// STYLE END ====

function App() {
  return (
    <div>
      <Title>Startup Nomogram</Title>
      <Calculator />
    </div>
  );
}

export default App;
