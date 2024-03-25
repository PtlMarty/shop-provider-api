import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../../../ShopServices";

function NewShopForm({ currentUser }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopData = { ...formData, user_id: currentUser.id };
    try {
      const response = await createShop(shopData);
      navigate(`/shops/${response.id}`);
    } catch (error) {
      console.error("An error occurred:", error);
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="addressInput">Address</label>
          <textarea
            id="addressInput"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email</label>
          <textarea
            id="emailInput"
            name="email"
            value={formData.email}
            onChange={handleChange}
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

NewShopForm.propTypes = {
  currentUser: PropTypes.object,
};

export default NewShopForm;
