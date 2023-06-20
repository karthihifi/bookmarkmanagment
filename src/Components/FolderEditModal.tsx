import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import FolderEditForm from "./FolderEditForm";
import { Component, useEffect, useState, Fragment } from "react";
import axios from "axios";

import { folder, category } from "./lib/types/interface";

interface folderEditProps {
  show: boolean;
  FolderData: folder;
  CategoriesHelp: category[];
  onHide: () => void;
  setSnackbaropen: (boolean) => void;
  setMsg: (string) => void;
}

const FolderEditModal: React.FC<folderEditProps> = (props) => {
// function FolderEditModal(props) {
  // console.log("Edit Modal", props);

  const [SubmitBtnVisible, setSubmitBtnVisible] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newCategory, setnewCategory] = useState("");
  const [newImgUrl, setnewImgUrl] = useState("");
  const [newfav, setnewfav] = useState("");

  const onSubmit = (ID) => () => {
    const basurl =
      "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
      ID +
      ",IsActiveEntity=true)/ContentManagService.draftEdit";
    const basurl2 =
      "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
      ID +
      ",IsActiveEntity=false)";
    const basurl1 =
      "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
      ID +
      ",IsActiveEntity=false)/ContentManagService.draftActivate";

    console.log(newTitle);

    // let payload1 = {
    //   folder_name: { newTitle },
    //   email: "test@gmail.com", //{ Email },
    //   maincategory: { Category },
    //   imageurl: { Imageurl },
    // };

    let payload = {
      folder_name: newTitle, //{ payload1.folder_name.folder_name },
    };

    console.log(payload);
    props.onHide();
    axios
      .post(basurl, { PreserveChanges: true })
      .then((response) => {
        axios
          .patch(basurl2, payload)
          .then((response) => {
            console.log(response);
            axios
              .post(basurl1, {})
              .then((response) => {
                console.log(response);
                props.setSnackbaropen(true);
                props.setMsg("Updaed Successfully");
                window.location.reload();
              })
              .catch((err) => {
                // if (err.response.data.error.message) {
                //   props.setMsg(err.response.data.error.message);
                //   props.setSnackbaropen(true);
                // }
              });
          })
          .catch((err) => {
            // if (err.response.data.error.message) {
            //   props.setMsg(err.response.data.error.message);
            //   props.setSnackbaropen(true);
            // }
          });
      })
      .catch((err) => {
        // if (err.response.data.error.message) {
        //   props.setMsg(err.response.data.error.message);
        //   props.setSnackbaropen(true);
        // }
      });
  };

  const onTitleChange = (event) => {
    setnewTitle(event.target.value);
    SubmitBtnVisible == false &&
      event.target.value == props.FolderData.folder_name
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

    if (
      SubmitBtnVisible == true &&
      newCategory == "" &&
      newfav == "" &&
      newImgUrl == "" &&
      event.target.value == props.FolderData.folder_name
    ) {
      setSubmitBtnVisible(false);
    }
  };

  const onCategoryChange = (event) => {
    setnewCategory(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.maincategory
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

    if (
      SubmitBtnVisible == true &&
      newTitle == "" &&
      newfav == "" &&
      newImgUrl == "" &&
      event.target.value == props.FolderData.folder_name
    ) {
      setSubmitBtnVisible(false);
    }
  };

  const onImgUrlChange = (event) => {
    setnewImgUrl(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.imageurl
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

    if (
      SubmitBtnVisible == true &&
      newTitle == "" &&
      newfav == "" &&
      newCategory == "" &&
      event.target.value == props.FolderData.folder_name
    ) {
      setSubmitBtnVisible(false);
    }
  };

  const onfavChange = (event) => {
    console.log(props.FolderData.favourities, event.target.value);
    setnewfav(event.target.value);
    // SubmitBtnVisible == false &&
    event.target.value == props.FolderData.favourities
      ? setSubmitBtnVisible(false)
      : setSubmitBtnVisible(true);

    if (
      SubmitBtnVisible == true &&
      newTitle == "" &&
      newImgUrl == "" &&
      newCategory == "" &&
      event.target.value == props.FolderData.folder_name
    ) {
      setSubmitBtnVisible(false);
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
          onCategoryChange={onCategoryChange}
          newCategory={newCategory}
          onImgUrlChange={onImgUrlChange}
          onfavChange={onfavChange}
        ></FolderEditForm>
      </Modal.Body>
      <Modal.Footer>
        {SubmitBtnVisible == true ? (
          <Button variant="success" onClick={onSubmit(props.FolderData.ID)}>
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
