import React from "react";
import styled from "styled-components";
import { TimeFrame } from "../utils";

const SiwtchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TimeFrameDisplay = styled.h1``;

const TimeFrameButton = styled.h1`
  color: cornflowerblue;
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
        return "주간";
      case TimeFrame.monthly:
        return "월간";
      case TimeFrame.yearly:
        return "연간";
    }
  };

  return (
    <SiwtchContainer>
      <TimeFrameDisplay>{getTimeframeText()}</TimeFrameDisplay>
      <TimeFrameButton>변경</TimeFrameButton>
    </SiwtchContainer>
  );
}

export default TimeFrameSwitch;
