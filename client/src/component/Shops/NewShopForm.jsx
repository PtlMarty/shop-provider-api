import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../../../ShopServices";

function NewShopForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopData = { name, address, email };
    try {
      const response = await createShop(shopData);
      navigate(`/shops/${response.id}`);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Post name:</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="addressInput">Address</label>
          <textarea
            id="addressInput"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email</label>
          <textarea
            id="emailInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default NewShopForm;
