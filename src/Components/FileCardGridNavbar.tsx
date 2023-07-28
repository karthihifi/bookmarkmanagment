/* eslint-disable jsx-a11y/alt-text */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./FileView.css";
import { FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { category } from "./lib/types/interface";
import image from "../Assets/images/logo192.png"
// import {} from "../../public/Chicken_Hi.jpg"

interface fileGroupNavbar {
    searchFiles: (event) => void,
    categories: category[]
}


const FilesCardGridNavbar: React.FC<fileGroupNavbar> = (props) => {

    const [SearchValue, setSearchValue] = useState('');

    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" className="fixed-top-nav">
            <Container>
                <Navbar.Brand href={window.location.origin} className='NavbarBrand'>
                    {/* <img src="https://bulma.io/images/bulma-logo.png" className="NavbarLogo d-inline-block align-top" />{' '} */}
                    <img src={image} className="NavbarLogo image is-48x48 d-inline-block align-top" />{' '}
                    {/* <img src="../../public/Begining_logo.png" className="NavbarLogo d-inline-block align-top" />{' '} */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="has-text-weight-semibold" href="#home">New Article</Nav.Link>
                        <Nav.Link className="has-text-weight-semibold" href="#link">Add Category</Nav.Link>
                        <NavDropdown className="has-text-weight-semibold" title="Categories" id="basic-nav-dropdown">
                            {props.categories.map((item) => {
                                return (<NavDropdown.Item className="has-text-weight-semibold is-5 is-capitalized" href={'#' + item.category}>{item.category}</NavDropdown.Item>)
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            size="sm"
                            aria-label="Search"
                            onChange={(event) => {
                                // console.log(event.target.value)
                                setSearchValue(event.target.value)
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    props.searchFiles(SearchValue)
                                }
                            }}
                        />
                        <Button className="has-text-weight-semibold" onClick={() => props.searchFiles(SearchValue)} variant="outline-info" size="sm">Search</Button>
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