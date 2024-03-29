import { API_URL } from "./src/constant.js";

async function fetchAllShops() {
  const response = await fetch(`${API_URL}/shops`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchAllShopsByUser(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/shops`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchShopById(id) {
  const response = await fetch(`${API_URL}/shops/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createShop(shop, userId) {
  const response = await fetch(`${API_URL}/users/${userId}/shops`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shop),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function shopProducts(shopId) {
  const response = await fetch(`${API_URL}/shops/${shopId}/products`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function destroyShop(userId, shopId) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/shops/${shopId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

export {
  createShop,
  destroyShop,
  fetchAllShops,
  fetchAllShopsByUser,
  fetchShopById,
  shopProducts,
};
