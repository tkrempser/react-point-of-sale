import { useRef, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

const OrderDetail = (props) => {
  const customerRef = useRef();
  const sellerRef = useRef();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const closeCancelModalHandler = () => setShowCancelModal(false);
  const closeSaveModalHandler = () => setShowSaveModal(false);

  const showCancelModalHandler = () => setShowCancelModal(true);
  const showSaveModalHandler = (event) => {
    event.preventDefault();
    setShowSaveModal(true);
  };

  const saveHandler = () => {
    const customer = customerRef.current.value;
    const seller = sellerRef.current.value;

    const orderData = {
      customer: customer,
      seller: seller,
    };

    props.onSaveOrder(orderData);
    setShowSaveModal(false);
  };

  const cancelHandler = () => {
    props.onCancelOrder();
    setShowCancelModal(false);
  };

  return (
    <>
      <Form id="order-detail-form" onSubmit={showSaveModalHandler}>
        <Form.Group className="mb-3" controlId="orderForm.CustomerSelect">
          <Form.Label>Select a customer</Form.Label>
          <Form.Select ref={customerRef} required>
            <option value="">Customer</option>
            {props.customers.map((customer) => (
              <option value={customer.url} key={customer.url}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4" controlId="orderForm.SellerSelect">
          <Form.Label>Select a seller</Form.Label>
          <Form.Select ref={sellerRef} required>
            <option value="">Seller</option>
            {props.sellers.map((seller) => (
              <option value={seller.url} key={seller.url}>
                {seller.first_name} {seller.last_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="card bg-light mb-4">
          <div className="card-body d-flex">
            <div className="lead align-self-center">Order total</div>
            <div className="h3 mb-0 ms-auto">
              $ <span>{props.sum.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            id="cancel-button"
            variant="secondary"
            className="me-2"
            onClick={showCancelModalHandler}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>

      <ConfirmModal
        modalTitle="Cancel order"
        modalMessage="Do you really want to clear all data?"
        show={showCancelModal}
        onCloseModalHandler={closeCancelModalHandler}
        onConfirmHandler={cancelHandler}
      />
      <ConfirmModal
        modalTitle="Save order"
        modalMessage="Do you really want to save the order?"
        show={showSaveModal}
        onCloseModalHandler={closeSaveModalHandler}
        onConfirmHandler={saveHandler}
      />
    </>
  );
};

export default OrderDetail;
