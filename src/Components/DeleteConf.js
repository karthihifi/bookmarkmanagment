import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// const onEdit = (folder) => () => {
const deltereq = (props) => () => {
  console.log(props.props);
  let url =
    "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
    props.props.FolderData.ID +
    ",IsActiveEntity=true)";
  axios
    .delete(url)
    .then((response) => {
      console.log(response);
      if (response.status == "200" || response.status == "204") {
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  props.props.onHide();
  //   window.location.reload()
  // props.onHide();
};
const DeleteConf = (props) => {
  return (
    <div className="Deleteconf">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>Do you Want to Delete {props.FolderData.folder_name}. ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deltereq({ props })}>
            Confirm
          </Button>{" "}
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default DeleteConf;
