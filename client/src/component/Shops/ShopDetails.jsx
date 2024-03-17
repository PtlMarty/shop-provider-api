import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import { destroyProduct } from "../../../ProductsServices";
import { fetchShopById, shopProducts } from "../../../ShopServices";

function ShopDetails() {
  // State to store the shop details
  const [shop, setShop] = useState({});
  // State to store the products
  const { id } = useParams();
  //  State to store the products
  const [products, setProducts] = useState([]);
  // State to store the confirmation modal visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  // State to store the product id to delete
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  // State to store the error message
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentShop = async () => {
      try {
        // Fetch the shop by id
        const json = await fetchShopById(id);
        // Set the shop in the state
        setShop(json);
        setError(null); // Clear any previous errors
      } catch (e) {
        // Log the error to the console
        console.error("An error occurred while fetching shop details:", e);
        setError("Failed to fetch shop details. Please try again later.");
      }
    };
    fetchCurrentShop();
  }, [id]);

  useEffect(() => {
    // Fetch the products for the shop
    const fetchProducts = async () => {
      try {
        const json = await shopProducts(id);
        // Set the products in the state
        setProducts(json);
        setError(null); // Clear any previous errors
      } catch (e) {
        // Log the error to the console
        console.error("An error occurred while fetching products:", e);
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, [id]);
  // Delete product
  const deleteProductHandler = async (id) => {
    try {
      await destroyProduct(id, shop.id);
      // Remove the product from the state
      setProducts(products.filter((product) => product.id !== id));
      // Hide the confirmation modal
      setShowConfirmation(false);
      setError(null); // Clear any previous errors
    } catch (e) {
      // Log the error to the console
      console.error("Failed to delete the product:", e);
      setError("Failed to delete the product. Please try again later.");
    } finally {
      // Reset the product id to delete
      setProductIdToDelete(null);
    }
  };
  // Confirmation modal
  const handleDeleteConfirmation = (id) => {
    //  Set the product id to delete
    setProductIdToDelete(id);
    // Show the confirmation modal
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
