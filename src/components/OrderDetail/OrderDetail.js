import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const OrderDetail = (props) => {
  let sum = 0;
  for (let product of props.orderProducts) {
    sum += product.quantity * product.price;
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="orderForm.CustomerSelect">
        <Form.Label>Select a customer</Form.Label>
        <Form.Select>
          <option>Customer</option>
          {props.customers.map((customer) => (
            <option value={customer.url} key={customer.url}>
              {customer.first_name} {customer.last_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4" controlId="orderForm.SellerSelect">
        <Form.Label>Select a seller</Form.Label>
        <Form.Select>
          <option>Seller</option>
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
            $ <span>{sum.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default OrderDetail;
