import { Modal } from "react-bootstrap";

const AddModal = (props) => {

    return (
<Modal show={props.show} onHide={props.hideAddModal}>
    <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    </Modal.Body>
    <Modal.Footer>
        <button className="btn btn-success" onClick={props.hideAddModal}>Close</button>
    </Modal.Footer>
</Modal>
    );
}

export default AddModal;