import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const NewProductForm = (props) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [enteredQuantity, setEnteredQuantity] = useState("");

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const productData = {
      url: singleSelections[0].url,
      name: singleSelections[0].name,
      quantity: +enteredQuantity,
      price: singleSelections[0].price,
    };

    props.onAddProduct(productData);

    setSingleSelections([]);
    setEnteredQuantity("");
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row className="mb-1">
        <Col md={8}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select a product</Form.Label>
            <Typeahead
              id="product-typeahead"
              labelKey="name"
              onChange={setSingleSelections}
              options={props.availableProducts}
              placeholder="Product name"
              selected={singleSelections}
              inputProps={{ required: true }}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantity"
              min="1"
              onChange={quantityChangeHandler}
              value={enteredQuantity}
              required
            />
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button variant="success" className="mb-3 w-100" type="submit">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NewProductForm;
