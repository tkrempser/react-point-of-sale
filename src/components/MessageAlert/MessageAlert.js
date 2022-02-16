import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

import "./MessageAlert.css";

const MessageAlert = (props) => {
  if (props.showAlert) {
    return (
      <Alert
        variant="success"
        onClose={() => props.onDismissAlert()}
        dismissible
      >
        <span>{props.alertMessage}</span>
      </Alert>
    );
  }

  return null;
};

export default MessageAlert;
