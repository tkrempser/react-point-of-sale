import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar } from "react-bootstrap";

import logo from "./logo.svg";
import ProductsList from "./components/ProductsList/ProductsList";
import NewProductForm from "./components/NewProductForm/NewProductForm";
import OrderDetail from "./components/OrderDetail/OrderDetail";

const App = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [sum, setSum] = useState(0);

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

    setSum((prevSum) => {
      const sum = prevSum + addedProduct.quantity * addedProduct.price;
      return sum;
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
            <h3 className="mb-3">Order detail</h3>
            <OrderDetail customers={customers} sellers={sellers} sum={sum} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
