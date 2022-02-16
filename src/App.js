import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Navbar } from "react-bootstrap";

import logo from "./logo.svg";
import ProductsList from "./components/ProductsList/ProductsList";
import NewProductForm from "./components/NewProductForm/NewProductForm";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import MessageAlert from "./components/MessageAlert/MessageAlert";

const API_ENDPOINT = "https://pos.krempser.com.br";

const App = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [sum, setSum] = useState(0);
  const [showCancelAlert, setCancelShowAlert] = useState(false);
  const [showSaveAlert, setSaveShowAlert] = useState(false);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/products.json`)
      .then((response) => response.json())
      .then((data) => setAvailableProducts(data.results));

    fetch(`${API_ENDPOINT}/customers.json`)
      .then((response) => response.json())
      .then((data) => setCustomers(data.results));

    fetch(`${API_ENDPOINT}/users.json`)
      .then((response) => response.json())
      .then((data) => setSellers(data.results));
  }, []);

  const addProductHandler = (addedProduct) => {
    setOrderProducts((prevOrderProducts) => {
      const existingProduct = prevOrderProducts.find(
        (product) => product.url === addedProduct.url
      );

      if (existingProduct) {
        const newPrevOrderProducts = prevOrderProducts.filter(
          (product) => product !== existingProduct
        );

        existingProduct.quantity += addedProduct.quantity;
        addedProduct = existingProduct;

        return [addedProduct, ...newPrevOrderProducts];
      }

      return [addedProduct, ...prevOrderProducts];
    });

    setSum((prevSum) => {
      const sum = prevSum + addedProduct.quantity * addedProduct.price;
      return sum;
    });
  };

  const removeProductHandler = (removedProduct) => {
    const newOrderProducts = orderProducts.filter(
      (product) => product.url !== removedProduct.url
    );

    setOrderProducts(newOrderProducts);

    setSum((prevSum) => {
      const sum = prevSum - removedProduct.quantity * removedProduct.price;
      return sum;
    });
  };

  const cancelOrderHandler = () => {
    setOrderProducts([]);
    setSum(0);
    setCancelShowAlert(true);
  };

  const saveOrderHandler = (orderData) => {
    let newOrder = {};

    fetch(`${API_ENDPOINT}/orders.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        newOrder = data;

        orderProducts.forEach((product) => {
          let orderProductData = {
            order: newOrder.url,
            product: product.url,
            quantity: product.quantity,
          };

          fetch(`${API_ENDPOINT}/order-products.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderProductData),
          });
        });
      });

    setSaveShowAlert(true);
  };

  const dismissCancelAlertHandler = () => {
    setCancelShowAlert(false);
  };

  const dismissSaveAlertHandler = () => {
    setSaveShowAlert(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
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
          <Col>
            <MessageAlert
              alertMessage="Order canceled successfully."
              showAlert={showCancelAlert}
              onDismissAlert={dismissCancelAlertHandler}
            ></MessageAlert>
            <MessageAlert
              alertMessage="Order saved successfully."
              showAlert={showSaveAlert}
              onDismissAlert={dismissSaveAlertHandler}
            ></MessageAlert>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col md={8} className="pt-1 pe-md-4">
            <h3 className="mb-3">Products</h3>
            <NewProductForm
              availableProducts={availableProducts}
              onAddProduct={addProductHandler}
            />
            <ProductsList
              orderProducts={orderProducts}
              onRemoveProduct={removeProductHandler}
            />
          </Col>

          <Col md={4} className="pt-4 pt-md-1 ps-md-4">
            <h3 className="mb-3">Order detail</h3>
            <OrderDetail
              customers={customers}
              sellers={sellers}
              sum={sum}
              onCancelOrder={cancelOrderHandler}
              onSaveOrder={saveOrderHandler}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
