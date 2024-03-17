import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import { destroyProduct } from "../../../ProductsServices";
import { fetchShopById, shopProducts } from "../../../ShopServices";

function ShopDetails() {
  const [shop, setShop] = useState({});
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentShop = async () => {
      try {
        const json = await fetchShopById(id);
        setShop(json);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error("An error occurred while fetching shop details:", e);
        setError("Failed to fetch shop details. Please try again later.");
      }
    };
    fetchCurrentShop();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const json = await shopProducts(id);
        setProducts(json);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error("An error occurred while fetching products:", e);
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, [id]);

  const deleteProductHandler = async (id) => {
    try {
      await destroyProduct(id, shop.id);
      setProducts(products.filter((product) => product.id !== id));
      setShowConfirmation(false);
    } catch (e) {
      console.error("Failed to delete the product:", e);
      setError("Failed to delete the product. Please try again later.");
    } finally {
      setProductIdToDelete(null);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmation(true);
  };

  return (
    <div>
      <h2>{shop.name}</h2>
      <Link to={`/shops/${id}/products/new`}>New Product</Link>
      {error && <Alert variant="danger">{error}</Alert>}
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
                  <button onClick={() => handleDeleteConfirmation(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteProductHandler(productIdToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShopDetails;
