import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Table, CloseButton } from "react-bootstrap";

const ProductsList = (props) => {
  if (props.orderProducts.length === 0) {
    return <div className="h5 text-muted">No products added yet.</div>;
  }

  const removeHandler = (url) => {
    props.onRemoveProduct(url);
  };

  return (
    <Row>
      <Col>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.orderProducts.map((product) => (
              <tr key={product.url}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${(product.quantity * product.price).toFixed(2)}</td>
                <td>
                  <CloseButton onClick={() => removeHandler(product.url)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductsList;
