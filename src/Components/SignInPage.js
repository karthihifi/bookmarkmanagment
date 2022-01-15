import "./SignInPage.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { createTheme } from "@mui/material/styles";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fb771a",
      main: "#fb771a",
      dark: "#fb771a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const auth = getAuth();

const logout = () => {
  auth.signOut();
};

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (auth.currentUser != null && authToken != null) {
      navigate("/");
    }
  });

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
            <h3>Login to BookMark Repository</h3>
          </div>
          <div className="SignInpage-content">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Enter Email Address.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </Form>
            <div className="SignInPage-btnwrp">
              <div>
                New User? <a href="#">Register</a> here
              </div>
              <Button
                theme={theme}
                className="SignInPage-btn"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={() => {
                  // console.log(email, password);
                  // const user1 = auth.currentUser;
                  // console.log(user1)
                  // auth.signOut();
                  signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      // Signed in
                      const user = userCredential.user;
                      // ...
                      sessionStorage.setItem(
                        "Auth Token",
                        userCredential._tokenResponse.refreshToken
                      );
                      navigate("/");
                      console.log(userCredential);
                      // console.log(auth);
                      // auth.signOut();
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                    });
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
