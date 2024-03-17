import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newProduct } from "../../../ProductsServices";

function NewProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { id: shopId } = useParams(); // Corrected
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, description, price, quantity };
    try {
      const response = await newProduct(shopId, productData); // Corrected
      console.log("New product created:", response);
      navigate(`/shops/${shopId}/products/${response.id}`);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <div>
      <h2>Create new product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Product name:</label>{" "}
          {/* Corrected label */}
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>{" "}
          {/* Corrected label */}
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantityInput">Quantity:</label>{" "}
          {/* Corrected label */}
          <input
            id="quantityInput"
            type="number" // Changed to type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0" // Added minimum value
          />
        </div>
        <div>
          <label htmlFor="priceInput">Price:</label> {/* Corrected label */}
          <input
            id="priceInput"
            type="number" // Changed to type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0" // Added minimum value
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default NewProductForm;