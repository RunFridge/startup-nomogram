import React, { useState } from "react";
import styled from "styled-components";
import MoneyInput from "./MoneyInput";

const Container = styled.div``;
// STYLE END ====

function Calculator() {
  return (
    <Container>
      <MoneyInput initialValue={160} label="만원" max={100000} />
    </Container>
  );
}

export default Calculator;
