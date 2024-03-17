import { API_URL } from "./src/constant";

async function newProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/shops/${id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating new product:", error);
  }
}

async function getProductById(id, shopId) {
  try {
    const response = await fetch(`${API_URL}/shops/${shopId}/products/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("Error getting product:", error);
  }
}

async function destroyProduct(id, shopId) {
  try {
    const response = await fetch(`${API_URL}/shops/${shopId}/products/${id}`, {
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

export { destroyProduct, getProductById, newProduct };
