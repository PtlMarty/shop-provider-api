import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";
import NavBar from "./component/NavBar/NavBar";

import "./App.css";

function App() {
  return (
    <>
      <h1>App.jsx</h1>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
