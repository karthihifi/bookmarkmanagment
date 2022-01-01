import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Component, useEffect, useState, useParams } from "react";

// const onEdit = (folder) => () => {
const deltereq = (props) => () => {
  //   console.log(props.props);
  //   let url =
  //     "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=" +
  //     props.props.FileData.ID +
  //     ",IsActiveEntity=true)";
  let baseurl =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=" +
    props.props.FolderId +
    ",IsActiveEntity=true)/ContentManagService.draftEdit";

  let baseurl1 =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/files(ID=" +
    props.props.FileData.ID +
    ",IsActiveEntity=true)";

  let baseurl2 =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=" +
    props.props.FolderId +
    ",IsActiveEntity=false)/ContentManagService.draftActivate";

  props.props.onHide();
  props.props.setLoadingDone(false);
  axios
    .post(baseurl, { PreserveChanges: true })
    .then(() => {
      axios
        .delete(baseurl1)
        .then(() => {
          axios
            .post(baseurl2, {})
            .then((response) => {
              console.log("tee", response);
              if (
                response.status == "200" ||
                response.status == "204" ||
                response.status == "201"
              ) {
                // props.props.setLoadingDone(true);
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
              props.props.setLoadingDone(true);
            });
        })
        .catch((err) => {
          console.log(err);
          props.props.setLoadingDone(true);
        });
    })
    .catch((err) => {
      console.log(err);
      props.props.setLoadingDone(true);
    });

  //   window.location.reload()
  // props.onHide();
};
const DeleteConfFile = (props) => {
  console.log(props);
  return (
    <div className="Deleteconf">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>Do you Want to Delete {props.FileData.title}. ?</p>
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
export default DeleteConfFile;
