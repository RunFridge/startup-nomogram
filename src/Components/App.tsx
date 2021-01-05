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
  font-size: 3em;

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2em;
  padding: 0.5em 2em;
`;
// STYLE END ====

function App() {
  return (
    <>
      <GlobalStyle />
      <TitleWrapper>
        <img src="https://d24wdqbfu08orq.cloudfront.net/dgggcrkxq/image/upload/v1586271553/noticon/nus6dsqgee1cfqy78el1.gif" />
        <Title>Startup Nomogram</Title>
      </TitleWrapper>
      <Calculator />
    </>
  );
}

export default App;
