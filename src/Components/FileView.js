import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./FileView.css";
import NavBarRootView from "./NavBarRootView"

const FileView = () => {
  const [FullData, setFullData] = useState([]);

  let { id } = useParams();

  let baseURL = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files`;

  const baseURL1 =
    "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=d0ad8a57-a423-435e-9deb-84497e866330,IsActiveEntity=true)/files(ID=935a6833-53f9-4c3a-a115-715ec2c22a5c,IsActiveEntity=true)/file_path";

  useEffect(() => {
    console.log(id);
    const FileUrl = axios.get(baseURL);
    // const FileUrl1 = axios.get(baseURL1);
    let CategoriesHelp = [];

    axios
      .all([FileUrl])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          // const responseTwo = responses[1]
          console.log(responseOne.data.value);
          setFullData(responseOne.data.value);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, []);

  return (
    <div className="FileView-root">
      <NavBarRootView view="File"/>
      {FullData.map((file) => (
        <div className="FileView">
          <div className="FileView-container">
            <img className="FileView-img" src={file.imageurl}></img>
            <h3 className="FileView-header">{file.title}</h3>
            <div className="FileView-date">{file.lastvisited}</div>
            <p></p>
            <p className="FileView-comment">{file.comments}</p>
            <p></p>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default FileView;
