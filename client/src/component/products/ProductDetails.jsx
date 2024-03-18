import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../ProductsServices";

function ProductDetails() {
  // State to store the product details
  const { id, shopId } = useParams();
  // State to store the product details
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Fetch the product by id
    const fetchCurrentProduct = async () => {
      try {
        const json = await getProductById(id, shopId);
        // Set the product in the state
        setProduct(json);
      } catch (e) {
        // Log the error to the console
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
