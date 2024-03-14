import { API_URL } from "./src/constant.js";

async function fetchAllShops() {
  const response = await fetch(`${API_URL}/shops`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export { fetchAllShops };
