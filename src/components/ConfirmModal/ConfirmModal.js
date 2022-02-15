import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.closeModalHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModalHandler}>
          No
        </Button>
        <Button variant="primary" onClick={props.confirmHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
