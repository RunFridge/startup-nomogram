import React from 'react';
import Calculator from './components/Calculator';
import Graph from './components/Graph';
import GlobalStyle from './GloblaStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Calculator />
        <Graph />
      </div>
    </>
  );
}

export default App;
