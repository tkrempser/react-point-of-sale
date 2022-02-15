import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar, Form, Button } from "react-bootstrap";

import logo from "./logo.svg";
import ProductsList from "./components/ProductsList/ProductsList";
import NewProductForm from "./components/NewProductForm/NewProductForm";

const App = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/products.json")
      .then((response) => response.json())
      .then((data) => setAvailableProducts(data.results));

    fetch("http://127.0.0.1:8001/customers.json")
      .then((response) => response.json())
      .then((data) => setCustomers(data.results));

    fetch("http://127.0.0.1:8001/users.json")
      .then((response) => response.json())
      .then((data) => setSellers(data.results));
  }, []);

  const addProductHandler = (addedProduct) => {
    setOrderProducts((prevOrderProducts) => {
      const existingProduct = prevOrderProducts.find(
        (product) => product.url === addedProduct.url
      );

      if (existingProduct) {
        prevOrderProducts.splice(
          prevOrderProducts.findIndex((product) => product === existingProduct),
          1
        );
        existingProduct.quantity += addedProduct.quantity;

        addedProduct = existingProduct;
      }

      return [addedProduct, ...prevOrderProducts];
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="React Point of Sale"
              src={logo}
              height="30"
              className="d-inline-block align-top me-2"
            />
            React Point of Sale
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col md={8} className="pt-1 pe-md-4">
            <h3 className="mb-3">Products</h3>
            <NewProductForm
              availableProducts={availableProducts}
              onAddProduct={addProductHandler}
            />
            <ProductsList orderProducts={orderProducts} />
          </Col>
          <Col md={4} className="pt-4 pt-md-1 ps-md-4">
            <h3 className="mb-3">Order details</h3>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Select a customer</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Select a seller</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <div className="card bg-light mb-4">
                <div className="card-body d-flex">
                  <div className="lead align-self-center">Order total</div>
                  <div className="h3 mb-0 ms-auto">
                    $ <span>199.90</span>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
