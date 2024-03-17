import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShopById } from "../../../ShopServices";

function ShopDetails() {
  const [shop, setShop] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentShops = async () => {
      try {
        const json = await fetchShopById(id);
        setShop(json);
      } catch (e) {
        console.error("An error occured:", e);
        console.log("An error occured:", e);
      }
    };
    fetchCurrentShops();
  }, [id]);

  return <div>{shop.name}</div>;
}

export default ShopDetails;
