import { useEffect, useState } from "react";
import { fetchShopById, shopProducts } from "../../../ShopServices";

function useShopDetails(shopId) {
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopData = await fetchShopById(shopId);
        setShop(shopData);
        setError(null);
      } catch (error) {
        setError("Failed to fetch shop details. Please try again later.");
      }
    };

    const fetchProducts = async () => {
      try {
        const productsData = await shopProducts(shopId);
        setProducts(productsData);
        setError(null);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchShop();
    fetchProducts();
  }, [shopId]);

  return { shop, products, error, setError, setProducts };
}

export default useShopDetails;
