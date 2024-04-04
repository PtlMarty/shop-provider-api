import PropTypes from "prop-types";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { destroyProduct } from "../../../ProductsServices";
import { destroyShop } from "../../../ShopServices";
import useShopDetails from "../../component/customHooks/useShopDetails";

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
    useShopDetails(shopId);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const navigate = useNavigate();
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const userId = currentUser.id;

  const handleDeleteConfirmation = (itemId, type) => {
    setItemIdToDelete(itemId);
    setDeleteType(type);
    setShowConfirmation(true);
  };

  const deleteHandler = async () => {
    try {
      if (deleteType === "product") {
        await destroyProduct(itemIdToDelete, shopId);
        setProducts(
          products.filter((product) => product.id !== itemIdToDelete)
        );
      } else if (deleteType === "shop") {
        await destroyShop(userId, shopId);
        navigate("/shops");
      }
      setShowConfirmation(false);
    } catch (error) {
      setError(`Failed to delete the ${deleteType}. Please try again later.`);
      console.error(error);
    } finally {
      setItemIdToDelete(null);
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
        onClick={() => handleDeleteConfirmation(shopId, "shop")}
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
                onDelete={(id) => handleDeleteConfirmation(id, "product")}
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
          {deleteType && (
            <Button variant="danger" onClick={deleteHandler}>
              Delete {deleteType.charAt(0).toUpperCase() + deleteType.slice(1)}
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
