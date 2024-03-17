import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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
      {products.map((product) => (
        <div key={product.id}>
          <Card>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {product.address}
              </Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ShopDetails;
