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
const ProductTableRow = ({ product, onDelete, total }) => (
  <tr key={product.id}>
    <td>{product.name}</td>
    <td>{product.description}</td>
    <td>{product.price}</td>
    <td>{product.quantity}</td>
    <td>{total}</td>
    <td>
      <Link
        className="btn btn-success m-2"
        to={`/shops/${product.shopId}/products/${product.id}`}
      >
        View
      </Link>
      <Button className="btn-danger m-2" onClick={() => onDelete(product.id)}>
        Delete
      </Button>
    </td>
  </tr>
);

const ShopDetails = ({ currentUser }) => {
  const { id: shopId } = useParams();
  const { shop, products, error, setProducts, setError } =
    useShopDetails(shopId); // Use the custom hook
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [, setShopIdToDelete] = useState(null);
  const navigate = useNavigate();
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const [deleteType, setDeleteType] = useState(null); // Add deleteType state

  const userId = currentUser.id;

  const handleProductDeleteConfirmation = (id) => {
    setProductIdToDelete(id);
    setDeleteType("product");
    setShowConfirmation(true);
  };

  const handleShopDeleteConfirmation = (shopid) => {
    setShopIdToDelete(shopid);
    setDeleteType("shop");
    setShowConfirmation(true);
  };

  const deleteProductHandler = async (productId) => {
    try {
      await destroyProduct(productId, shopId);
      setProducts(products.filter((product) => product.id !== productId));
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
      setShopIdToDelete(null);
    }
  };

  return (
    <div>
      <h2>{shop.name}</h2>
      <Link className="btn btn-success" to={`/shops/${shopId}/products/new`}>
        New Product
      </Link>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        className="m-3 btn-danger"
        onClick={() => handleShopDeleteConfirmation(shopId)}
      >
        Delete Shop
      </Button>
      <div key={shop.id}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total / product</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onDelete={handleProductDeleteConfirmation}
                total={product.price * product.quantity}
              />
            ))}
            <tr>
              <td colSpan="2">Total Price:</td>
              <td colSpan="3">${totalPrice}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* Confirmation Modal */}
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
          {/* Conditionally render "Delete Product" or "Delete Shop" button based on deleteType */}
          {deleteType === "product" && (
            <Button
              variant="danger"
              onClick={async () => {
                await deleteProductHandler(productIdToDelete);
              }}
            >
              Delete Product
            </Button>
          )}
          {deleteType === "shop" && (
            <Button
              variant="danger"
              onClick={async () => {
                await deleteShopHandler(shopId);
              }}
            >
              Delete Shop
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

ShopDetails.propTypes = {
  currentUser: PropTypes.object,
};

export default ShopDetails;
