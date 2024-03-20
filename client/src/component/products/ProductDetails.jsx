import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
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
    <div className="mt-5 d-flex align-items-center justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: {product.price}</Card.Text>
          <Card.Text>Quantity: {product.quantity}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/shops`}>Back</Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ProductDetails;
