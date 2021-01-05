import React from "react";
import styled from "styled-components";
import { TimeFrame } from "../utils";

const SiwtchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
`;

const TimeFrameLabel = styled.label`
  border-bottom: 1px solid;
  margin-bottom: 1em;
`;

const TimeFrameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 20%;
`;

const TimeFrameDisplay = styled.h1`
  font-size: 2em;
`;

const TimeFrameButton = styled.h1`
  font-size: 1em;
  color: #3498db;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #f1c40f;
  }
  &:active {
    color: tomato;
  }
`;

// STYLE END ====

type _Props = {
  currentTimeFrame: TimeFrame;
  onClick: () => void;
};

function TimeFrameSwitch({ currentTimeFrame, onClick }: _Props) {
  const getTimeframeText = (): string => {
    switch (currentTimeFrame) {
      case TimeFrame.weekly:
        return "주간 (weekly)";
      case TimeFrame.monthly:
        return "월간 (monthly)";
      case TimeFrame.yearly:
        return "연간 (yearly)";
    }
  };

  return (
    <SiwtchContainer>
      <TimeFrameLabel htmlFor="timeframe">단위</TimeFrameLabel>
      <TimeFrameWrapper id="timeframe">
        <TimeFrameDisplay>{getTimeframeText()}</TimeFrameDisplay>
        <TimeFrameButton onClick={onClick}>단위 전환</TimeFrameButton>
      </TimeFrameWrapper>
    </SiwtchContainer>
  );
}

export default TimeFrameSwitch;
