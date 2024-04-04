import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { fetchAllShopsByUser } from "../../../ShopServices.js";

function ShopsList({ currentUser }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      // Check if currentUser is defined
      // eslint-disable-next-line no-inner-declarations
      async function loadShops() {
        setLoading(true);
        try {
          const data = await fetchAllShopsByUser(currentUser.id);
          setShops(data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      }
      loadShops();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Link className="btn btn-success m-5" to="/shops/new">
        Create a new shop
      </Link>
      <Container>
        <Row>
          {shops.map((shop) => (
            <Col key={shop.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card className="h-100 w-100">
                <Card.Body>
                  <Card.Title>{shop.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {shop.address}
                  </Card.Subtitle>
                  <Link
                    className="btn btn-primary mt-2"
                    to={`/shops/${shop.id}`}
                  >
                    View Shop
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

ShopsList.propTypes = {
  currentUser: PropTypes.object,
};

export default ShopsList;
