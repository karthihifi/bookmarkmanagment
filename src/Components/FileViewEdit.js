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

  const onSaveChanges = () => {
    console.log(LinksData,inputUrlList,filedata)
    if (inputUrlList.length < LinksData.length ) {
      console.log("Deletion happpened");
    } else if(inputUrlList.length > LinksData.length){
      console.log("Insertion happpened");
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
  };

  const removeRow = (index) => {
    const list = [...inputUrlList];
    list.splice(index, 1);
    setUrlList(list);
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
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FileViewEdit;
