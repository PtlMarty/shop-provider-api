import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";
import NavBar from "./component/NavBar/NavBar";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function autoLogin() {
      if (localStorage.uid) {
        try {
          const response = await fetch("http://localhost:3000/auto_login", {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.uid,
            },
          });
          if (response.ok) {
            const user = await response.json();
            setCurrentUser(user);
          } else {
            console.log("Failed to auto login");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("User not found");
      }
    }

    autoLogin();
    console.log();
  }, []);
  console.log(currentUser);
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
