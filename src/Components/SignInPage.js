import "./SignInPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function SignInPage() {
  return (
    <div className="SignInPage_container">
      <div className="SignInPage-sideimg">
        <img
          classname="SignInPage-img"
          src="https://images.unsplash.com/photo-1596959393431-3862a913bb36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        ></img>
      </div>
      <div className="SignInpage-formcontent">
        <div className="SignInpage-box">
          <div className="SignInpage-header">
            <h3>Login to Content Management</h3>
          </div>
          <div className="SignInpage-content">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button className = "SignInPage-btn" variant="contained" endIcon={<SendIcon />}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
