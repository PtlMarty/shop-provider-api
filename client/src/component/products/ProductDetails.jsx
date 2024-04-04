import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../ProductsServices";

function ProductDetails() {
  // State to store the product details
  const { id } = useParams();
  // State to store the product details
  const [product, setProduct] = useState([]);
  const shopId = product.shop_id;

  useEffect(() => {
    // Fetch the product by id
    const fetchCurrentProduct = async () => {
      try {
        const json = await getProductById(id);
        // Set the product in the state
        setProduct(json);
      } catch (e) {
        // Log the error to the console
        console.error("An error occured:", e);
        console.log("An error occured:", e);
      }
    };
    fetchCurrentProduct();
  }, [id]);
  return (
    <div className="mt-5 d-flex align-items-center justify-content-center">
      <Card className="w-75">
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: {product.price}</Card.Text>
          <Card.Text>Quantity: {product.quantity}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link className="btn btn-warning" to={`/shops/${shopId}`}>
            Back
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ProductDetails;
