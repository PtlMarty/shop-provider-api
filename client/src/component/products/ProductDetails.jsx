import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../ProductsServices";

function ProductDetails() {
  const { id, shopId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const json = await getProductById(id, shopId);
        setProduct(json);
      } catch (e) {
        console.error("An error occured:", e);
        console.log("An error occured:", e);
      }
    };
    fetchCurrentProduct();
  }, [id, shopId]);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.quantity}</p>
    </div>
  );
}

export default ProductDetails;
