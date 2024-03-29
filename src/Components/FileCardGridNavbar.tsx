/* eslint-disable jsx-a11y/alt-text */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./FileView.css";
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { category } from "./lib/types/interface";
// import image from "../Assets/images/logo192.png"
import image from "../Assets/images/starbucks.png";
import { useNavigate, useParams } from "react-router-dom";
// import {} from "../../public/Chicken_Hi.jpg"
import { getFileDetails } from "./lib/graphql/queries";
import { file } from "./lib/types/interface";
import { Autocomplete, TextField } from "@mui/material";
import AddFileCategoryModal from "./Files/AddFileCategoryModal";
import "bootstrap/dist/css/bootstrap.css";
import FolderCategoryAddModal from "./FolderCategoryAddModal";

interface fileGroupNavbar {
    searchFiles: (event) => void;
    categories: category[];
}

const FilesCardGridNavbar: React.FC<fileGroupNavbar> = (props) => {
    const navigate = useNavigate();
    const { id, folder } = useParams();
    const [SearchValue, setSearchValue] = useState("");
    const [ShowAddCategory, setShowAddCategory] = useState(false);
    const [FileData, setFileData] = useState<file[]>([]);

    useEffect(() => {
        getFileDetails("LluX8HIgcvVxilRBsgYc", folder).then((response) => {
            setFileData(response.files);
        });
    });
    return (
        <div>
            <Navbar
                bg="dark"
                expand="lg"
                variant="dark"
                sticky="top"
                className="fixed-top-nav"
            >
                <Container>
                    <Navbar.Brand href={window.location.origin} className="NavbarBrand">
                        {/* <img src="https://bulma.io/images/bulma-logo.png" className="NavbarLogo d-inline-block align-top" />{' '} */}
                        <img
                            src={image}
                            className="NavbarLogo image is-48x48 d-inline-block align-top"
                        />{" "}
                        {/* <img src="../../public/Begining_logo.png" className="NavbarLogo d-inline-block align-top" />{' '} */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                className="has-text-weight-semibold"
                                onClick={() => {
                                    navigate("/fileadd", {
                                        state: { id: id, folder: folder },
                                    });
                                }}
                            >
                                New Article
                            </Nav.Link>
                            <Nav.Link
                                className="has-text-weight-semibold"
                                onClick={() => {
                                    console.log('clicked')
                                    setShowAddCategory(true)
                                }}
                            >
                                Add Category
                            </Nav.Link>
                            <NavDropdown
                                className="has-text-weight-semibold"
                                title="Categories"
                                id="basic-nav-dropdown"
                            >
                                {props.categories.map((item) => {
                                    return (
                                        <NavDropdown.Item
                                            className="has-text-weight-semibold is-5 is-capitalized"
                                            href={"#" + item.category}
                                        >
                                            {item.category}
                                        </NavDropdown.Item>
                                    );
                                })}
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={FileData.map((option) => option.title)}
                                sx={{
                                    width: "20rem",
                                    background: "white",
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                }}
                                size="small"
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    if (newValue == null) {
                                        setSearchValue("");
                                        props.searchFiles("");
                                    } else {
                                        setSearchValue(newValue);
                                        props.searchFiles(newValue);
                                    }
                                    // newValue == null ? setSearchValue('') :
                                    //     setSearchValue(newValue)
                                }}
                                onKeyDown={(event: any) => {
                                    if (event.key === "Enter") {
                                        props.searchFiles(event.target.value);
                                        props.searchFiles(event.target.value);
                                        event.preventDefault();
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: "search",
                                        }}
                                    />
                                )}
                            />
                            {/* <Form.Control
                            autoComplete=''
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
                        /> */}
                            <Button
                                className="has-text-weight-semibold"
                                onClick={() => props.searchFiles(SearchValue)}
                                variant="outline-info"
                                size="sm"
                            >
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <AddFileCategoryModal
                show={ShowAddCategory}
                onHide={() => setShowAddCategory(false)}
            ></AddFileCategoryModal>
        </div>
    );
};

export default FilesCardGridNavbar;
