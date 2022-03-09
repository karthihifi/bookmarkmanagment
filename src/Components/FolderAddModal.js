import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import FolderAddForm from "./FolderAddForm";
import { Component, useEffect, useState, Fragment } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function FolderAddModal(props) {
  const [FolderName, setFolderName] = useState("");
  const [Email, setEmail] = useState("");
  const [Category, setCategory] = useState("Study");
  const [Imageurl, setImageurl] = useState("");
  const [FolderId, setFolderId] = useState("");
  const [Fav, setFav] = useState(false);
  // const [ErrorMsg, setErrorMsg] = useState("");
  // const [Snackbaropen, setSnackbaropen] = useState(false);
  // console.log("Folder Modal", Category);

  const basurl =
    "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder";
  const basurl1 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${FolderId},IsActiveEntity=false)/ContentManagService.draftActivate`;

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
      favourites: {Fav}
    };

    let payload1 = {
      folder_name: payload.folder_name.FolderName,
      email: "test@gmail.com", //{ Email },
      maincategory: payload.maincategory.Category,
      imageurl: payload.imageurl.Imageurl,
      favourites: payload.favourites.Fav
    };

    if (payload1.folder_name == "") {
      return;
    }

    // LoadingDone={props.LoadingDone}
    props.onHide();
    props.setLoadingDone(false)

    axios({
      method: "POST",
      url: basurl,
      data: payload1,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        setFolderId(response.data.ID);
        console.log(response.data.ID);
        let url =
          "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
          response.data.ID +
          ",IsActiveEntity=false)/ContentManagService.draftActivate";
        console.log(url);
        axios({
          method: "POST",
          url: url,
          data: {},
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            if (payload1.folder_name != "") {
              props.setMsg(`New Collection ${payload1.folder_name} Created`);
              setValidated(false);
              setFolderName("");
              setEmail("");
              setImageurl("");
              props.onHide();
              // props.setLoadingDone(true)
              props.setSnackbaropen(true);
              window.location.reload(); 
            }
          })
          .catch((err, resp) => {
            if (err.response.data.error.message) {
              props.setMsg(err.response.data.error.message);
              console.log("Error", props.Msg);
              props.onHide();
              props.setLoadingDone(true)
              props.setSnackbaropen(true);
            }
          });
      })
      .catch((err) => {
        props.setLoadingDone(true)
        console.log("Error", err);
      });
  };

  const ClearForm = () => {
    setFolderName("");
    setEmail("");
    setCategory("");
    setImageurl("");
  };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setSnackbaropen(false);
  // };

  // const action = (
  //   <Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </Fragment>
  // );

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
          setFav= {setFav}
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
      {/* <Snackbar
        open={Snackbaropen}
        autoHideDuration={60000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      /> */}
    </Modal>
  );
}

export default FolderAddModal;
