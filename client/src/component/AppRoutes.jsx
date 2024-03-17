import { Route, Routes } from "react-router-dom";
import ShopDetails from "./Shops/ShopDetails";
import ShopList from "./Shops/ShopList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopList />} />
      <Route path="shops/:id" element={<ShopDetails />} />
    </Routes>
  );
}

export default AppRoutes;
