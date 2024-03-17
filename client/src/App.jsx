import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";

import "./App.css";

function App() {
  return (
    <>
      <h1>HERE</h1>
      <Router>
        <h2>HERE</h2>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
