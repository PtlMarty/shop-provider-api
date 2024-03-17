import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { fetchAllShops } from "../../../ShopServices.js";

function ShopsList() {
  // State to store the shops
  const [shops, setShops] = useState([]);
  // State to store the loading status
  const [, setLoading] = useState(true);
  // State to store the error message
  const [, setError] = useState(null);

  // fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllShops();
        // Set the shops in the state
        setShops(data);
        setLoading(false);
      } catch (e) {
        // Log the error to the console
        setError(e);
        // Set the loading to false
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      <h2>/shops</h2>
      <Container>
        <Row>
          {shops.map((shop) => (
            <Col key={shop.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card key={shop.id} className="h-100 w-100">
                <Card.Body>
                  <Card.Title>{shop.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {shop.address}
                  </Card.Subtitle>
                  <Link to={`/shops/${shop.id}`}>View Shop</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ShopsList;
