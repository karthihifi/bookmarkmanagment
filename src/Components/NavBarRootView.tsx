import "bootstrap/dist/css/bootstrap.css";
import { Nav, NavDropdown, Navbar, Container, NavbarProps } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaMeteor } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import "./NavBarRootView.css";
import { Component, useEffect, useState } from "react";
import { Divider, Link, Drawer } from "@mui/material";
import FolderDrawerCat from "./FolderDrawerCat";
import FileAdd from "./FileAdd";
import FolderAddModal from "./FolderAddModal";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { category } from "./lib/types/interface"
import { createCategory } from "./lib/graphql/mutations";
import FolderCategoryAddModal from './FolderCategoryAddModal'

const auth = getAuth();

interface navBarProps {
  view?: string;
  Categories?: category[];
  Msg?: string;
  setMsg?: (string) => void;
  setSnackbaropen?: (boolean) => void;
  LoadingDone?: boolean;
  setLoadingDone?: (boolean) => void;

  folder?: string;
  FolderId?: string;
  setFullData?: (any) => void;
  FullData?: any;
  FullDefaultData?: any;
  setStartIndex?: (number) => void;
  setEndIndex?: (number) => void;
  setFullLength?: (number) => void;

  url?: any
  data?: any
  LinksData?: any
  TagsData?: any


  // folder={folder}
  // FolderId={id}
  // view="File"
  // Categories={CategoryData}
  // setFullData={setFullData}
  // FullData={FullData}
  // FullDefaultData={FullDefaultData}
  // setStartIndex={setStartIndex}
  // setEndIndex={setEndIndex}
  // setFullLength={setFullLength}
}

const getnavbaritems = (view) => {
  if (view == "Folder") {
    return "New Folder";
  } else if (view == "File") {
    return "New Article";
  } else if (view == "FileViewSingle") {
    return "New Reference Link";
  }
};

const getnavbaritems1 = (view) => {
  if (view == "Folder") {
    return "New Folder Category";
  } else if (view == "File") {
    return "New Article Category";
  } else if (view == "FileViewSingle") {
    return "New Tag";
  }
};

const NavBarRootView: React.FC<navBarProps> = (props) => {
  // function NavBarRootView(props) {
  const navigate = useNavigate();
  // console.log("File View", props.LinksData);
  console.log("view", props.view);

  const [Drawerstate, setDrawerstate] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const toggleDrawer = (open) => (event) => {
    console.log(open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerstate(open);
    console.log(Drawerstate);
  };

  const [FolderAddModalShow, setFolderAddModalShow] = useState(false);

  return (
    <div className="RootView_Navbar">
      <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
        <Container>
          {props.view == "File" || props.view == "Folder" ? (
            <div className="RootView_Navbar-menu">
              <Navbar.Brand onClick={toggleDrawer(true)}>
                <span>
                  <AiOutlineMenu size="30px"></AiOutlineMenu>
                </span>
              </Navbar.Brand>
              <Drawer
                anchor="left"
                open={Drawerstate}
                onClose={toggleDrawer(false)}
              >
                <FolderDrawerCat
                  toggleDrawer={toggleDrawer}
                  Category={props.Categories}
                  view={props.view}
                  setFullData={props.setFullData}
                  FullData={props.FullData}
                  FullDefaultData={props.FullDefaultData}
                  setStartIndex={props.setStartIndex}
                  setEndIndex={props.setEndIndex}
                  setFullLength={props.setFullLength}
                ></FolderDrawerCat>
              </Drawer>
            </div>
          ) : (
            ""
          )}

          <Navbar.Brand href={window.location.origin}>
            <span>
              <FaMeteor size="30px"></FaMeteor>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* {props.view != "FileViewEdit" ? :} */}
            <Nav className="me-auto">
              {props.view != "FileViewEdit" ? (
                <NavDropdown
                  className="RootView_Navbar-Add"
                  title={props.view == "FileViewAdd" ? "" : "Add"}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      if (props.view == "File") {
                        // console.log(props.FolderId);
                        navigate("/fileadd", {
                          state: { id: props.FolderId, folder: props.folder },
                        });
                      } else if (props.view == "Folder") {
                        setFolderAddModalShow(true);
                      }
                    }}
                  >
                    {getnavbaritems(props.view)}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => {
                    if (props.view == "Folder" || props.view == "File") {
                      setShowCreateCategory(true);
                      console.log('New Category')
                    }
                  }}>
                    {getnavbaritems1(props.view)}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
              {props.view == "FileViewSingle" ? (
                <Nav.Link
                  onClick={() =>
                    navigate(props.url, {
                      state: {
                        filedata: props.data,
                        LinksData: props.LinksData,
                      },
                    })
                  }
                >
                  Edit
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            {/* <Nav className="me-auto">
              <NavDropdown
                className="RootView_Navbar-Add"
                title="Add"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={(event) => console.log(props.view)}>
                  {getnavbaritems(props.view)}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {getnavbaritems1(props.view)}
                </NavDropdown.Item>
              </NavDropdown>
              {props.view == "FileViewSingle" ? (
                <Nav.Link onClick={() => navigate(props.url)}>Edit</Nav.Link>
              ) : (
                ""
              )}
            </Nav> */}
            <Nav>
              <Nav.Link>
                <span
                  className="RootView_Navbar-img"
                  onClick={() => {
                    console.log('signout', auth)
                    auth.signOut();
                    sessionStorage.removeItem('Auth Token');

                    navigate("/signin")
                  }}
                >
                  <FaUserCircle size="25px"></FaUserCircle>
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FolderAddModal
        show={FolderAddModalShow}
        CategoriesHelp={[1, 2]}
        onHide={() => setFolderAddModalShow(false)}
        Msg={props.Msg}
        setMsg={props.setMsg}
        setSnackbaropen={props.setSnackbaropen}
        LoadingDone={props.LoadingDone}
        setLoadingDone={props.setLoadingDone}
      />
      <FolderCategoryAddModal
        show={showCreateCategory}
        onHide={setShowCreateCategory}
        view ={props.view}
      ></FolderCategoryAddModal>
    </div>
  );
}

export default NavBarRootView;
