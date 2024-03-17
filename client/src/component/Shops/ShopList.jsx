import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { fetchAllShops } from "../../../ShopServices.js";

function ShopList() {
  const [shops, setShops] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // fetch posts from the API
  React.useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllShops();
        setShops(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      <h2>/shops</h2>
      {shops.map((shop) => (
        <Card key={shop.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{shop.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {shop.address}
            </Card.Subtitle>
            <Link to={`/shops/${shop.id}`}>View Shop</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ShopList;
