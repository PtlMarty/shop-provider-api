import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";

import "./App.css";

function App() {
  return (
    <>
      <h1>App.jsx</h1>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
