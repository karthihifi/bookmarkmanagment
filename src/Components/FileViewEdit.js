import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBarRootView from "./NavBarRootView";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const FileViewEdit = (props) => {
  const { state } = useLocation();
  console.log("Edit View", state);
  return (
    <div className="FileViewEdit">
      <NavBarRootView view="FileViewEdit" />
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" value={state.title}/>
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
            <Form.Control type="text" placeholder="Password" value={state.category}/>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
export default FileViewEdit;
