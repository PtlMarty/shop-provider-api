import { Route, Routes } from "react-router-dom";
import NewShopForm from "./Shops/NewShopForm";
import ShopDetails from "./Shops/ShopDetails";
import ShopsList from "./Shops/ShopsList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopsList />} />
      <Route path="shops/:id" element={<ShopDetails />} />
      <Route path="shops/new" element={<NewShopForm />} />
    </Routes>
  );
}

export default AppRoutes;
