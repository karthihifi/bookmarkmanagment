import "bootstrap/dist/css/bootstrap.css";
import {
    Modal,
    Button,
  } from "react-bootstrap";
  import FolderEditForm from "./FolderEditForm"

function FolderEditModal(props) {
    console.log('Edit Modal',props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Details for {props.FolderData.folder_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FolderEditForm CategoriesHelp = {props.CategoriesHelp} FolderData = {props.FolderData}></FolderEditForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderEditModal;
