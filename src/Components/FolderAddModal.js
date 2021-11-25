import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import FolderAddForm from "./FolderAddForm";
import { Component, useEffect, useState } from "react";
import axios from "axios";

function FolderAddModal(props) {
  const [FolderName, setFolderName] = useState("");
  const [Email, setEmail] = useState("");
  const [Category, setCategory] = useState("");
  const [Imageurl, setImageurl] = useState("");
  const [FolderId, setFolderId] = useState("");
  // console.log("Folder Modal", Category);

  const basurl =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder";
  const basurl1 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${FolderId},IsActiveEntity=false)/ContentManagService.draftActivate`;
  
  const AddFolder = () => {
    const payload = {
      folder_name: { FolderName },
      email: { Email },
      maincategory: { Category },
      imageurl: { Imageurl },
    };

    console.log("Payload", payload);
    axios.post(basurl, payload).then((response) => {
      console.log(response);
      setFolderId(response.data.ID);
      axios.post(basurl1).then((resp) => console.log(resp));
    });
    props.onHide();
  };

  const ClearForm = () => {
    setFolderName("");
    setEmail("");
    setCategory("");
    setImageurl("");
  };
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
        <FolderAddForm
          FolderName={FolderName}
          setFolderName={setFolderName}
          Email={Email}
          setEmail={setEmail}
          Category={Category}
          setCategory={setCategory}
          CategoriesHelp={props.CategoriesHelp}
          Imageurl={Imageurl}
          setImageurl={setImageurl}
          ClearForm={ClearForm}
        ></FolderAddForm>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            ClearForm();
            props.onHide();
          }}
        >
          Close
        </Button>
        <Button onClick={AddFolder}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderAddModal;
