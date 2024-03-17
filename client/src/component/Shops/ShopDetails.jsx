import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import { fetchShopById, shopProducts } from "../../../ShopServices";

function ShopDetails() {
  const [shop, setShop] = useState({});
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCurrentShops = async () => {
      try {
        const json = await fetchShopById(id);
        setShop(json);
      } catch (e) {
        console.error("An error occured:", e);
        console.log("An error occured:", e);
      }
    };
    fetchCurrentShops();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const json = await shopProducts(id);
        setProducts(json);
      } catch (e) {
        console.error("An error occured:", e);
        console.log("An error occured:", e);
      }
    };
    fetchProducts(id);
  }, [id]);

  return (
    <div>
      <h2>/shops/id</h2>
      <Link to={`/shops/${id}/products/new`}>New Product</Link>
      {shop.name}
      <div key={shop.id}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/shops/${id}/products/${product.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShopDetails;
