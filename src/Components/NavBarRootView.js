import "bootstrap/dist/css/bootstrap.css";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FileView from "./FileView";
import { FaUserCircle, FaMeteor } from "react-icons/fa";
import "./NavBarRootView.css";

function NavBarRootView(props) {
  return (
    <div className="RootView_Navbar">
      <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <span>
              <FaMeteor size="30px"></FaMeteor>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                className="RootView_Navbar-Add"
                title="Add"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={(event) => console.log(props.view)}>
                  {props.view == "Folder" ? "New Folder" :  "New Article"}
                </NavDropdown.Item>
                <NavDropdown.Item> {props.view == "Folder" ? "New Folder Category" :  "New Article Category"}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>
                <span className="RootView_Navbar-img">
                  <FaUserCircle size="25px"></FaUserCircle>
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarRootView;
