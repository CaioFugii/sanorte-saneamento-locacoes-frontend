import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>
         { props.text}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Entendi</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertModal;
