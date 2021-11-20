import "bootstrap/dist/css/bootstrap.css";
import {
    Modal,
    Button,
  } from "react-bootstrap";
  import FolderAddForm from "./FolderAddForm"

function FolderAddModal(props) {
    console.log('Folder Modal',props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         New Collection Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FolderAddForm CategoriesHelp = {props.CategoriesHelp}></FolderAddForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderAddModal;
