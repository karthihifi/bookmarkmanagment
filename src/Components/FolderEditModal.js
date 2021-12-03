import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import FolderEditForm from "./FolderEditForm";
import { Component, useEffect, useState, Fragment } from "react";
import axios from "axios";

function FolderEditModal(props) {
  // console.log("Edit Modal", props);

  const [SubmitBtnVisible, setSubmitBtnVisible] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newCategory, setnewCategory] = useState("");
  const [newImgUrl, setnewImgUrl] = useState("");
  const [newfav, setnewfav] = useState("");

  const onTitleChange = (event) => {
    setnewTitle(event.target.value);
    SubmitBtnVisible == false &&
    event.target.value == props.FolderData.folder_name
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

      if (SubmitBtnVisible == true && newCategory == "" && newfav == "" && newImgUrl == "") {
        setSubmitBtnVisible(false)
      }
  };

  const onCategoryChange = (event) => {
    setnewCategory(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.maincategory
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

      if (SubmitBtnVisible == true && newTitle == "" && newfav == "" && newImgUrl == "") {
        setSubmitBtnVisible(false)
      }
  };

  const onImgUrlChange = (event) => {
    setnewImgUrl(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.imageurl
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

      if (SubmitBtnVisible == true && newTitle == "" && newfav == "" && newCategory == "") {
        setSubmitBtnVisible(false)
      }
  };

  const onfavChange = (event) => {
    console.log(props.FolderData.favourites,event.target.value)
    setnewfav(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.favourites
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

      if (SubmitBtnVisible == true && newTitle == "" && newImgUrl == "" && newCategory == "") {
        setSubmitBtnVisible(false)
      }
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
          Edit Details for {props.FolderData.folder_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FolderEditForm
          CategoriesHelp={props.CategoriesHelp}
          FolderData={props.FolderData}
          onTitleChange={onTitleChange}
          onCategoryChange = {onCategoryChange}
          newCategory = {newCategory}
          onImgUrlChange = {onImgUrlChange}
          onfavChange = {onfavChange}
        ></FolderEditForm>
      </Modal.Body>
      <Modal.Footer>
        {SubmitBtnVisible == true ? (
          <Button variant="success" onClick={props.onHide}>
            Submit
          </Button>
        ) : (
          ""
        )}

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderEditModal;
