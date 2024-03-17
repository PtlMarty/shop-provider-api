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

export { newProduct };
