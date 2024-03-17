import { Route, Routes } from "react-router-dom";
import NewShopForm from "./Shops/NewShopForm";
import ShopDetails from "./Shops/ShopDetails";
import ShopsList from "./Shops/ShopsList";
import NewProductForm from "./products/NewProductForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopsList />} />
      <Route path="shops/:id" element={<ShopDetails />} />
      <Route path="shops/new" element={<NewShopForm />} />
      <Route path="shops/:id/products/new" element={<NewProductForm />} />
      {/* <Route path="shops/:id/products/:id" element={<NewProductForm />} /> */}
    </Routes>
  );
}

export default AppRoutes;
