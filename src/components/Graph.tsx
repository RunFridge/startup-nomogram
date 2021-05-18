import React from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  position: absolute;
  width: 100%;
`;
// END STYLE ==

const Graph = () => {
  return (
    <>
      <StyledCanvas />
    </>
  );
};

export default Graph;
