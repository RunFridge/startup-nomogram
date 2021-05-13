import React from 'react';
import StartupContainer from './containers/StartupContainer';
import GlobalStyle from './GloblaStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <StartupContainer />
      </div>
    </>
  );
}

export default App;
