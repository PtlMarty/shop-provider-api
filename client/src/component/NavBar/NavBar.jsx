import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <nav>
      <Link to="/">Shops List</Link>
      {" | "}
      <Link to="/shops/new">New Shop</Link>
      {" | "}
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default NavBar;
