import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onCloseModalHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModalHandler}>
          No
        </Button>
        <Button variant="primary" onClick={props.onConfirmHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
