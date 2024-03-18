import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./component/AppRoutes";
import NavBar from "./component/NavBar/NavBar";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.uid) console.log("User found:", localStorage.uid);
    else console.log("User not found");
  }, []);

  async function checkUser() {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "satoshi@nakamoto.com",
          password: "Satoshi123!",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const user = await response.json();
      localStorage.setItem("uid", user.uid); // Utilisation de setItem pour stocker la valeur dans le localStorage
      setCurrentUser(user.id); // Assurez-vous que setCurrentUser fonctionne correctement
    } catch (error) {
      console.error("Error:", error);
    }
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
