import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../userForm/LoginModal";

function NavBar() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <nav>
      <Link to="/">Shops List</Link>
      {" | "}
      <Link to="/shops/new">New Shop</Link>
      {" | "}
      {currentUser ? (
        <div>User ID: {currentUser.id}</div>
      ) : (
        <LoginModal setCurrentUser={setCurrentUser} />
      )}
    </nav>
  );
}

export default NavBar;
