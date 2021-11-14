import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBarRootView from "./NavBarRootView";
import "./FileViewSingle.css";
import { Badge, Breadcrumb } from "react-bootstrap";

const FileViewSingle = (props) => {
  let { id, folder, fileid, file } = useParams();
  const [LinksData, setLinksData] = useState([]);
  const [TagsData, setTagsData] = useState([]);
  const [FileData, setFileData] = useState({});

  const folderUrl = () => {
    // var url = "http://localhost:3000/file/" + id + "/" + folder;
    var url = window.location.origin + "/file/" + id + "/" + folder;
    return url;
  };

  let homeurl = window.location.origin + "/file/" + id + "/" + folder;
  console.log(homeurl);

  let baseURL = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files(ID=${fileid},IsActiveEntity=true)/file_path`;

  const baseURL1 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files(ID=${fileid},IsActiveEntity=true)/tags`;

  const baseURL2 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files(ID=${fileid},IsActiveEntity=true)`;

  useEffect(() => {
    console.log(baseURL);
    const FileUrl = axios.get(baseURL);
    const FileUrl1 = axios.get(baseURL1);
    const FileUrl2 = axios.get(baseURL2);
    let CategoriesHelp = [];

    axios
      .all([FileUrl, FileUrl1, FileUrl2])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          //   console.log(responseTwo.data);
          setLinksData(responseOne.data.value);
          setTagsData(responseTwo.data.value);
          setFileData(responseThree.data);
          console.log(FileData.title);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, []);

  return (
    <div className="FileViewSingle">
      <NavBarRootView
        view="FileViewSingle"
        url={
          "/file/" +
          id +
          "/" +
          folder +
          "/" +
          fileid +
          "/" +
          file +
          "/" +
          "edit"
        }
        data={FileData}
        LinksData={LinksData}
        TagsData={TagsData}
      />
      <div className="FileViewSingle-container">
        <div className="FileViewSingle-date">{FileData.lastvisited}</div>
        <h1 className="FileViewSingle-header">{FileData.title}</h1>
        <div className="FileViewSingle-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href={window.location.origin}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={homeurl}
              //   href={"http://localhost:3000/file/" + id + "/" + folder}
            >
              {folder}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{file}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <hr></hr>
        <div className="FileViewSingle-adhoc">
          <dl>
            <dt>Reference Links : </dt>
          </dl>
          {LinksData.map((link, index) => (
            <dd>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <span> {LinksData.length - 1 != index ? " / " : ""} </span>
            </dd>
          ))}
        </div>
        <hr></hr>
        <div className="FileViewSingle-body">
          <div className="FileViewSingle-left">
            <img className="FileViewSingle-img" src={FileData.imageurl}></img>
            <div className="FileViewSingle-tag">
              <div>Tags : </div>
              {TagsData.map((tag, index) => (
                <div className="FileViewSingle-badge">
                  <Badge bg="secondary">{tag.tag_name}</Badge>{" "}
                </div>
              ))}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: FileData.comments}} />
          {/* <p className="FileViewSingle-comment">{FileData.comments}</p> */}
        </div>
      </div>
    </div>
  );
};
export default FileViewSingle;
