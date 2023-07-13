import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./FileView.css";
import { FormControl } from 'react-bootstrap';

const FilesCardGridNavbar = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" className="fixed-top-nav">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">New Article</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            size="sm"
                            aria-label="Search"
                        />
                        <Button variant="outline-info" size="sm">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <nav className="navbar is-dark " role="navigation" aria-label="main navigation">
        //     <div className="navbar-brand">
        //         <a className="navbar-item" href="https://bulma.io">
        //             {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
        //         </a>

        //         <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        //             <span aria-hidden="true"></span>
        //             <span aria-hidden="true"></span>
        //             <span aria-hidden="true"></span>
        //         </a>
        //     </div>

        //     <div id="navbarBasicExample" className="navbar-menu">
        //         <div className="navbar-start">
        //             <a className="navbar-item">
        //                 Home
        //             </a>

        //             <a className="navbar-item">
        //                 New Article
        //             </a>

        //             <div className="navbar-item has-dropdown is-hoverable">
        //                 <a className="navbar-link">
        //                     More
        //                 </a>

        //                 <div className="navbar-dropdown">
        //                     <a className="navbar-item">
        //                         About
        //                     </a>
        //                     <a className="navbar-item">
        //                         Jobs
        //                     </a>
        //                     <a className="navbar-item">
        //                         Contact
        //                     </a>
        //                     <hr className="navbar-divider" />
        //                     <a className="navbar-item">
        //                         Report an issue
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="navbar-end">
        //             <div className="navbar-item">
        //                 {/* <Form className="d-flex">
        //     <Form.Control
        //       type="search"
        //       placeholder="Search"
        //       className="me-2"
        //       aria-label="Search"
        //     /> */}
        //                 {/* <Button variant="outline-success">Search</Button> */}
        //                 <div className="field">
        //                     <p className="control has-icons-left">
        //                         <input className="input is-primary is-small is-rounded" type="text" placeholder="Search" />
        //                         <span className="icon is-small is-left">
        //                             <i className="fas fa-envelope"></i>
        //                         </span>
        //                     </p>
        //                 </div>
        //                 {/* <input className="input is-primary is-small is-rounded" type="text" placeholder="Search"></input> */}
        //                 {/* <button className="button is-info is-light is-small">Info</button> */}
        //                 {/* </Form> */}
        //                 {/* <div className="buttons">
        //                     <a className="button is-primary">
        //                         <strong>Sign up</strong>
        //                     </a>
        //                     <a className="button is-light">
        //                         Log in
        //                     </a>
        //                 </div> */}
        //             </div>
        //         </div>
        //     </div>
        // </nav>
    );
}

export default FilesCardGridNavbar;