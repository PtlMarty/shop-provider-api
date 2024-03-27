import PropTypes from "prop-types";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { destroyProduct } from "../../../ProductsServices";
import { destroyShop } from "../../../ShopServices";
import useShopDetails from "../../component/customHooks/useShopDetails";

// Custom hook for fetching shop details

// Product table row component
const ProductTableRow = ({ product, onDelete }) => (
  <tr key={product.id}>
    <td>{product.name}</td>
    <td>{product.description}</td>
    <td>{product.price}</td>
    <td>{product.quantity}</td>
    <td>
      <Link to={`/shops/${product.shopId}/products/${product.id}`}>View</Link>
      <Button onClick={() => onDelete(product.id)}>Delete</Button>
    </td>
  </tr>
);

const ShopDetails = ({ currentUser }) => {
  const { id: shopId } = useParams();
  const { shop, products, error, setProducts, setError } =
    useShopDetails(shopId); // Use the custom hook
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const navigate = useNavigate();
  const userId = currentUser.id;

  const handleDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setShowConfirmation(true);
  };

  const deleteProductHandler = async (id) => {
    try {
      await destroyProduct(id, shopId);
      setProducts(products.filter((product) => product.id !== id));
      setShowConfirmation(false);
    } catch (error) {
      setError("Failed to delete the product. Please try again later.");
      console.log(error);
    } finally {
      setProductIdToDelete(null);
    }
  };

  const deleteShopHandler = async (shopId) => {
    try {
      await destroyShop(userId, shopId); // Assuming destroyShop deletes the shop based on the ID
      // Assuming you don't need to update products or error state when deleting a shop
      setShowConfirmation(false);
      navigate("/shops");
    } catch (error) {
      setError("Failed to delete the shop. Please try again later.");
      console.error(error);
    } finally {
      setProductIdToDelete(null);
    }
  };

  return (
    <div>
      <h2>{shop.name}</h2>
      <Link to={`/shops/${shopId}/products/new`}>New Product</Link>
      <Button onClick={() => setShowConfirmation(true)}>Delete Shop</Button>
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
              <ProductTableRow
                key={product.id}
                product={product}
                onDelete={handleDeleteConfirmation}
              />
            ))}
          </tbody>
        </Table>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteProductHandler(productIdToDelete);
              await deleteShopHandler(shopId);
              setShowConfirmation(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ShopDetails.propTypes = {
  currentUser: PropTypes.object,
};

export default ShopDetails;
