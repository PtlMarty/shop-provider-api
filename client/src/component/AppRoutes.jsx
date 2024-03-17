import { Route, Routes } from "react-router-dom";
import ShopDetails from "./Shops/ShopDetails";
import ShopsList from "./Shops/ShopsList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopsList />} />
      <Route path="shops/:id" element={<ShopDetails />} />
    </Routes>
  );
}

export default AppRoutes;
