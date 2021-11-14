import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./FileView.css";
import NavBarRootView from "./NavBarRootView";
import { Breadcrumb } from "react-bootstrap";
import { BiDotsVerticalRounded, BiCommentEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const FileView = () => {
  const [FullData, setFullData] = useState([]);

  let { id, folder } = useParams();

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

  // var location: Location;
  // const homeurl = location.host;
  // let history = useHistory();
  // const goToPreviousPath = () => {
  //     history.goBack()
  // }

  return (
    <div className="FileView-root">
      <NavBarRootView view="File" />
      <div className="FileView-header">
        <h2>Discover New Possiblities</h2>
        <div className="FileView-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href={window.location.origin}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{folder}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {FullData.map((file) => (
        <div className="FileView">
          <div className="FileView-container">
            <img className="FileView-img" src={file.imageurl}></img>
            <Link to={"/file/" + id + "/" + folder + "/" + file.ID + "/" + file.title}>
              <h3 className="FileView-header1">{file.title}</h3>
            </Link>

            {/* <div className="FileView-date">{file.lastvisited}</div> */}
            <span className="FileView-date">
              <BiDotsVerticalRounded />
            </span>
            <p></p>
            <div className="FileView-comment" dangerouslySetInnerHTML={{__html: file.comments}} />
            {/* <p className="FileView-comment">{file.comments}</p> */}
            <p></p>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default FileView;
