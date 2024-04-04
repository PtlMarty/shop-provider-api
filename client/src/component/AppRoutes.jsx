import Proptypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import NewShopForm from "./Shops/NewShopForm";
import ShopDetails from "./Shops/ShopDetails";
import ShopsList from "./Shops/ShopsList";
import Home from "./pages/Home";
import NewProductForm from "./products/NewProductForm";
import ProductDetails from "./products/ProductDetails";
import LoginForm from "./userForm/LoginForm";
import RegisterForm from "./userForm/RegisterForm";

function AppRoutes({ currentUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shops" element={<ShopsList currentUser={currentUser} />} />
      <Route
        path="shops/:id"
        element={<ShopDetails currentUser={currentUser} />}
      />
      <Route
        path="shops/new"
        element={<NewShopForm currentUser={currentUser} />}
      />
      <Route path="shops/:id/products/new" element={<NewProductForm />} />
      <Route path="shops/:id/products/:id" element={<ProductDetails />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

AppRoutes.propTypes = {
  currentUser: Proptypes.object,
};

export default AppRoutes;
