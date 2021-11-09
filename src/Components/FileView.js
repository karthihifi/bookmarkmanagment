import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./FileView.css";

const FileView = () => {
  let { id } = useParams();

  return (
    <div className="FileView">
      {/* <Container> */}
      <div className="FileView-container">
        <img
          className="FileView-img"
          src="https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjI3Mzd8MHwxfHNlYXJjaHwxfHxCb29rTWFyayUyMFVSTCUyMGhhbmRsaW5nfGVufDB8fHx8MTYzNjAzNjc2OQ&ixlib=rb-1.2.1&q=80&w=1080"
        ></img>
        {/* <div> */}
          <h3 className="FileView-header">BookMark URL handling</h3>
          <div className="FileView-date">11/7/2021</div>
          <p></p>
          <p className="FileView-comment">
            ID : {id}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. It only works
            in combination with the display property set to -webkit-box or
            -webkit-inline-box and the -webkit-box-orient property set to
            vertical. In most cases you will also want to set overflow to
            hidden, otherwise the contents won't be clipped but an ellipsis will
            still be shown after the specified number of lines. When applied to
            anchor elements, the truncating can happen in the middle of the
            text, not necessarily at the end.
          </p>
          <p></p>
          
        </div>
      {/* </div> */}
      {/* <hr></hr> */}
      {/* </Container> */}
    </div>
  );
};

export default FileView;
