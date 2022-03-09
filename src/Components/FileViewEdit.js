import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component, useEffect, useState } from "react";
import NavBarRootView from "./NavBarRootView";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "./FileViewEdit.css";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const FileViewEdit = (props) => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { filedata, LinksData } = state;
  console.log("props", window.location.pathname);

  const [FileTitle, setFileTitle] = useState(filedata.title);
  const [FileCat, setFileCat] = useState(filedata.category);
  const [FileImgurl, setFileFileImgurl] = useState(filedata.imageurl);
  const [FileComments, setFileComments] = useState(filedata.comments);
  const [FileReference, setFileReference] = useState([{ title: "", url: "" }]);
  const [FileTags, setFileTags] = useState([""]);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (auth.currentUser == null && authToken == null) {
      navigate("/signin");
      return;
    }
  });

  // let payload = {};
  let newPathID;

  const basurl = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/ContentManagService.draftEdit`;
  const basurl1 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/files`;
  let basurl2 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/files(ID=${filedata.ID},IsActiveEntity=false)`;

  let basurl3 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/files(ID=${filedata.ID},IsActiveEntity=false)/file_path`;
  let basurl4 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/file_path(ID=${newPathID},IsActiveEntity=false)`;

  // let basurl5 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/filesID=${newID},IsActiveEntity=false)/tags`;
  // let basurl6 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/file_path(ID=${newtagID},IsActiveEntity=false)`;

  const basurl7 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/ContentManagService.draftPrepare`;
  const basurl8 = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${filedata.up__ID},IsActiveEntity=false)/ContentManagService.draftActivate`;

  const onSaveChanges = () => {
    console.log(LinksData, inputUrlList, filedata);
    if (inputUrlList.length < LinksData.length) {
      // console.log("Deletion happpened");
      // console.log(newDelList, LinksData);
      // LinksData.forEach((item, index) => {
      //   console.log(item.ID);
      //   let found = newDelList.find((item) => item == index);
      //   if (found == undefined) {
      //     return;
      //   }
      //   console.log(found,LinksData[found].ID);
      // });

      axios.post(basurl, { PreserveChanges: true }).then((response) => {
        LinksData.forEach((item, index) => {
          let found = newDelList.find((item) => item == index);
          console.log(found);
          if (found == undefined) {
            return;
          }
          console.log(item.ID);
          basurl4 =
            "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/file_path(ID=" +
            item.ID +
            ",IsActiveEntity=false)";
          axios.delete(basurl4, {}).then((resp) => {
            console.log(resp);
          });
        });
        axios.post(basurl7, {}).then((response) => {
          axios.post(basurl8, {}).then((response) => {
            navigate(window.location.pathname.split("/edit")[0]);
          });
        });
      });
    } else if (inputUrlList.length > LinksData.length) {
      console.log("Insertion happpened");
      axios.post(basurl, { PreserveChanges: true }).then((response) => {
        for (let i = LinksData.length; i < inputUrlList.length; i++) {
          let payload1 = {
            title: inputUrlList[i].title,
            url: inputUrlList[i].url,
          };
          axios.post(basurl3, {}).then((resp) => {
            console.log(resp);
            newPathID = resp.data.ID;
            basurl4 =
              "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/file_path(ID=" +
              newPathID +
              ",IsActiveEntity=false)";
            axios.patch(basurl4, payload1).then((resp) => {
              console.log(resp);
            });
          });
        }
        axios.post(basurl7, {}).then((response) => {
          axios.post(basurl8, {}).then((response) => {
            navigate(window.location.pathname.split("/edit")[0]);
          });
        });
      });
    }
  };
  // console.log("Edit View", htmlToDraft(convertToRaw(filedata.comments)));

  const blocksFromHtml = htmlToDraft(filedata.comments);
  const { contentBlocks, entityMap } = blocksFromHtml;
  // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  // const raw = EditorState.createWithContent(contentState);

  // let _contentState = ContentState.createFromText(filedata.comments);
  let _contentState = ContentState.createFromBlockArray(contentBlocks);
  const raw = convertToRaw(_contentState);
  const [DefaultState, setDefaultState] = useState(raw);
  // console.log(DefaultState);
  const [editorState, setContentState] = useState(EditorState.createEmpty());
  const [inputUrlList, setUrlList] = useState(LinksData);
  const [newDelList, setDelList] = useState([]);
  // console.log("adad", inputUrlList);

  const onEditorStateChange = (editorState) => {
    setContentState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setFileComments(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  if (inputUrlList.length == 0) {
    setUrlList([...inputUrlList, { title: "", url: "" }]);
  }
  const addRow = () => {
    setUrlList([...inputUrlList, { title: "", url: "" }]);
    // setNewUrlList([...newUrlList, { title: "", url: "" }]);
  };

  const removeRow = (index) => {
    const list = [...inputUrlList];
    list.splice(index, 1);
    setUrlList(list);
    setDelList([...newDelList, index]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputUrlList];
    list[index][name] = value;
    setUrlList(list);
  };

  // const multiinp = (x) => {
  //   console.log("multiinp", x);
  //   return (
  //     //inputUrlList.map((x) => {
  //     <Row className="mb-3">
  //       <Form.Group as={Col} controlId="formGridEmail">
  //         <Form.Label>Reference Link Title</Form.Label>
  //         <Form.Control
  //           type="email"
  //           placeholder="Enter Title"
  //           value={x.firstName}
  //         />
  //       </Form.Group>

  //       <Form.Group as={Col} controlId="formGridPassword">
  //         <Form.Label>Reference Link url</Form.Label>
  //         <Form.Control type="text" placeholder="Url" value={x.lastName} />
  //       </Form.Group>
  //     </Row>
  //     //});
  //   );
  // };
  return (
    <div className="FileViewEdit">
      <NavBarRootView view="FileViewEdit" />
      <div className="FileViewEdit-container">
        <h3 className="FileViewEdit-header">{filedata.title}</h3>
        <h4 className="FileViewEdit-subhead1">Main Section</h4>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2} size="sm">
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="title"
                name="title"
                defaultValue={filedata.title}
                // value={filedata.title}
                size="sm"
                onChange={(event) => {
                  console.log(event.target.value);
                  setFileTitle(event.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2} size="sm">
              Category
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Password"
                defaultValue={filedata.category}
                onChange={(event) => {
                  console.log(event.target.value);
                  setFileCat(event.target.value);
                }}
                // value={filedata.category}
                size="sm"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2} size="sm">
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={filedata.imageurl}
                // value={filedata.imageurl}
                size="sm"
                onChange={(event) => {
                  console.log(event.target.value);
                  setFileFileImgurl(event.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2} size="sm">
              Comments
            </Form.Label>
            <Col sm={10} className="Wysig_editor">
              <Editor
                defaultContentState={DefaultState}
                onContentStateChange={setDefaultState}
                //   editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
            </Col>
          </Form.Group>
        </Form>
        <div className="FileViewEdit-ref">
          <h4 className="FileViewEdit-subhead1">Reference Link Section</h4>
          <Form>
            {/* {inputUrlList.length == 0 ? : ""} */}
            {inputUrlList.map((link, index) => (
              <div className="FileViewEdit-refform">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label size="sm">Ref. Title</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ente Reference Title"
                      value={link.title}
                      name="title"
                      onChange={(e) => handleInputChange(e, index)}
                      size="sm"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Ref. Link</Form.Label>
                    {/* <Col sm={40}> */}
                    <Form.Control
                      className="FileViewEdit-refform-link"
                      type="text"
                      placeholder="Enter Reference Link"
                      value={link.url}
                      name="url"
                      onChange={(e) => handleInputChange(e, index)}
                      size="sm"
                    />
                    {/* </Col> */}
                  </Form.Group>
                </Row>
                <div className="FileViewEdit-refform-btn mb-3">
                  <Button onClick={addRow} variant="primary" size="sm">
                    Add Row
                  </Button>{" "}
                  {index != 0 ? (
                    <Button
                      onClick={() => removeRow(index)}
                      variant="secondary"
                      size="sm"
                    >
                      Delete Row
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </Form>
        </div>
      </div>
      <div className="FileViewEdit-footer">
        <div className="FileViewEdit-footer-btn">
          <Button variant="primary" size="sm" onClick={onSaveChanges}>
            Submit
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              navigate(window.location.pathname.split("/edit")[0]);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FileViewEdit;
