import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBarRootView from "./NavBarRootView";
import "./FileViewSingle.css";
import { Badge, Breadcrumb } from "react-bootstrap";

const FileViewSingle = () => {
  let { id, folder, fileid, file } = useParams();
  const [LinksData, setLinksData] = useState([]);
  const [TagsData, setTagsData] = useState([]);

  const folderUrl = () => {
    var url = "http://localhost:3000/file/" + id + folder;
    return url;
  };

  let baseURL = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files(ID=${fileid},IsActiveEntity=true)/file_path`;

  const baseURL1 =
  `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files(ID=${fileid},IsActiveEntity=true)/tags`;

  useEffect(() => {
    console.log(baseURL);
    const FileUrl = axios.get(baseURL);
    const FileUrl1 = axios.get(baseURL1);
    let CategoriesHelp = [];

    axios
      .all([FileUrl, FileUrl1])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1]
        //   console.log(responseTwo.data);
          setLinksData(responseOne.data.value);
          setTagsData(responseTwo.data.value)
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, []);

  return (
    <div className="FileViewSingle">
      <NavBarRootView view="FileViewSingle" />
      <div className="FileViewSingle-container">
        <div className="FileViewSingle-date">APRIL 20, 2021</div>
        <h1 className="FileViewSingle-header">Going Headless with Craft CMS</h1>
        <div className="FileViewSingle-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href="http://localhost:3000">Home</Breadcrumb.Item>
            <Breadcrumb.Item
              href={"http://localhost:3000/file/" + id + "/" + folder}
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
            <img
              className="FileViewSingle-img"
              src="https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjI3Mzd8MHwxfHNlYXJjaHwxfHxCb29rTWFyayUyMFVSTCUyMGhhbmRsaW5nfGVufDB8fHx8MTYzNjAzNjc2OQ&ixlib=rb-1.2.1&q=80&w=1080"
            ></img>
            <div className="FileViewSingle-tag">
              <div>Tags : </div>
              {TagsData.map((tag, index) => (
              <div className="FileViewSingle-badge">
                <Badge bg="secondary">{tag.tag_name}</Badge>{" "}
              </div>
               ))}
            </div>
          </div>
          <div className="FileViewSingle-comment">
            A version of this article was originally published in 2019 but has
            been updated to reflect the most recent advancements in headless
            technology for Craft CMS as of April 2021. What is a headless CMS? A
            headless CMS is a major shift from the traditional model for
            delivering web content. It is not a single technology, it is an
            approach for serving web pages and data to your users. Rather than
            have a single codebase handle both content management and
            presentation of that content, a headless CMS is only concerned with
            content management, leaving presentation up to other parts of the
            tech stack. A version of this article was originally published in
            2019 but has been updated to reflect the most recent advancements in
            headless technology for Craft CMS as of April 2021. What is a
            headless CMS? A headless CMS is a major shift from the traditional
            model for delivering web content. It is not a single technology, it
            is an approach for serving web pages and data to your users. Rather
            than have a single codebase handle both content management and
            presentation of that content, a headless CMS is only concerned with
            content management, leaving presentation up to other parts of the
            tech stack. A version of this article was originally published in
            2019 but has been updated to reflect the most recent advancements in
            headless technology for Craft CMS as of April 2021. What is a
            headless CMS? A headless CMS is a major shift from the traditional
            model for delivering web content. It is not a single technology, it
            is an approach for serving web pages and data to your users. Rather
            than have a single codebase handle both content management and
            presentation of that content, a headless CMS is only concerned with
            content management, leaving presentation up to other parts of the
            tech stack.
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileViewSingle;
