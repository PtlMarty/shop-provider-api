import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Shops List</Link>
      {" | "}
      <Link to="/shops/new">New Shop</Link>
    </nav>
  );
}

export default NavBar;
