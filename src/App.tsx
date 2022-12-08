import React from 'react';
import UseMintSolana from './components/UseMintSolana';
import WalletAdapterSol from './components/WalletAdapterSol';

function App() {
  return (
    <>
      <WalletAdapterSol>
        <UseMintSolana />
      </WalletAdapterSol>
    </>
  );
}

export default App;
