import { Modal, Button } from 'react-bootstrap';

const Confirm = (props) => {
  const { onHide, onSubmit, massage } = props;
  const handleSubmit = () => {
    onSubmit();
    onHide();
  }
  
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> { massage } </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
      </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Yes
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Confirm;