import React from 'react';
import Calculator from './components/Calculator';
import GlobalStyle from './GloblaStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Calculator />
      </div>
    </>
  );
}

export default App;
