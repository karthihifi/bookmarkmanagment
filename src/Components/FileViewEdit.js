import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Component, useEffect, useState } from "react";
import NavBarRootView from "./NavBarRootView";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "./FileViewEdit.css";
// import htmlToDraft from 'html-to-draftjs';

const FileViewEdit = (props) => {
  const { state } = useLocation();
  console.log("Edit View", state.comments);

  let _contentState = ContentState.createFromText(state.comments);
  const raw = convertToRaw(_contentState);
  const [DefaultState, setDefaultState] = useState(raw);
  console.log(DefaultState);
  const [editorState, setContentState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setContentState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className="FileViewEdit">
      <NavBarRootView view="FileViewEdit" />
      <div className="FileViewEdit-container">
        <h3 className="FileViewEdit-header">{state.title}</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={state.title}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Password"
                value={state.category}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={state.imageurl}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Comments
            </Form.Label>
            <Col sm={10} className="Wysig_editor">
              {/* <Form.Control type="text" placeholder="Password" value={state.category}/> */}
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
      </div>
    </div>
  );
};
export default FileViewEdit;
