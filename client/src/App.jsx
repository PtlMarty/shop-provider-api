import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";
import NavBar from "./component/NavBar/NavBar";

import "./App.css";

function App() {
  useEffect(() => {
    if (localStorage.uid) console.log("User found:", localStorage.uid);
    else console.log("User not found");
  }, []);

  async function checkUser() {
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: "satoshi@nakamoto.com",
        password: "Satoshi123!",
      }),
    })
      .then((resp) => resp.json())
      .then((user) => (localStorage.uid = user.uid));
  }
  checkUser();
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
