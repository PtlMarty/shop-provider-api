import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../userForm/LoginModal";

function NavBar() {
  return (
    <nav>
      <Link to="/">Shops List</Link>
      {" | "}
      <Link to="/shops/new">New Shop</Link>
      {" | "}
      <LoginModal />
    </nav>
  );
}

export default NavBar;
