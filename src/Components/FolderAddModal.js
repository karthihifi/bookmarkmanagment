import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import FolderAddForm from "./FolderAddForm";
import { Component, useEffect, useState } from "react";
import axios from "axios";

function FolderAddModal(props) {
  const [FolderName, setFolderName] = useState("");
  const [Email, setEmail] = useState("");
  const [Category, setCategory] = useState("Study");
  const [Imageurl, setImageurl] = useState("");
  const [FolderId, setFolderId] = useState("");
  // console.log("Folder Modal", Category);

  const basurl =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder";
  const basurl1 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${FolderId},IsActiveEntity=false)/ContentManagService.draftActivate`;

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(validated);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Inside", validated);
    }

    setValidated(true);
    console.log(validated);
  };

  const AddFolder = (event) => {
    handleSubmit(event);
    let payload = {
      folder_name: { FolderName },
      email: "test@gmail.com", //{ Email },
      maincategory: { Category },
      imageurl: { Imageurl },
    };

    let payload1 = {
      folder_name: payload.folder_name.FolderName,
      email: "test@gmail.com", //{ Email },
      maincategory: payload.maincategory.Category,
      imageurl: payload.imageurl.Imageurl,
    };

    if (payload1.folder_name == "") {
      return;
    }

    axios({
      method: "POST",
      url: `https://cors-anywhere.herokuapp.com/${basurl}`,
      data: payload1,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((response) => {
      setFolderId(response.data.ID);
      console.log(response.data.ID);
      let url =
        "https://cors-anywhere.herokuapp.com/https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=" +
        response.data.ID +
        ",IsActiveEntity=false)/ContentManagService.draftActivate";
      console.log(url);
      axios({
        method: "POST",
        url: url,
        data: {},
        headers: {
          // "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (payload1.folder_name != "") {
          setValidated(false);
          setFolderName("");
          setEmail("");
          setImageurl("");
          props.onHide();
        }
      });
    });
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
          validated={validated}
          handleSubmit={handleSubmit}
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
        <Button type="submit" onClick={AddFolder}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderAddModal;
