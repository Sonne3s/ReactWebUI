import React, { useState } from "react"

import PricesPage from "./components/PricesPage"

var timerId;

function App() {

  function renderPage() {
    return <PricesPage />
  }

  return (
    <div id="main">
      {renderPage()}
    </div>
  );
}

export default App; 