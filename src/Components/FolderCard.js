import { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import FolderEditModal from "./FolderEditModal";
import {
  Popover,
  Overlay,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BiDotsVerticalRounded, BiCommentEdit } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import "./RootView.css";
import FileView from "./FileView";

const Card = (props) => {
  const [FolderData, SetFolderData] = useState([]);
  const [CategoriesHelp, setCategoriesHelp] = useState([]);
  const [CurrentFolderData, SetCurrentFolderData] = useState({});
  const [FolderEditModalShow, setFolderEditModalShow] = useState(false);
  const [CardextradetailsShow, setCardextradetailsShow] = useState(false);

  const UpdateFolderData = (fulldata) => {
    let FolderData = [];

    for (let i = 0; i < fulldata.length; i++) {
      if (props.maincategory == fulldata[i].maincategory) {
        FolderData.push(fulldata[i]);
      }
    }
    SetFolderData(FolderData);
  };

  useEffect(() => {
    UpdateFolderData(props.fulldata);
    setCategoriesHelp(props.categoryHelp);
    console.log("cat1", props.categoryHelp);
  }, []);

  const onEdit = (folder) => () => {
    // console.log(folder.folder);
    var popover = document.getElementById("popover-basic");
    popover.classList.remove("show");
    SetCurrentFolderData(folder.folder);
    setFolderEditModalShow(true);
  };

  const onDelete = () => {
    console.log("Delete");
  };

  // const onShowextra = () =>{
  //   setCardextradetailsShow(true)
  // }

  const popover = (props) => {
    // console.log(props)
    return (
      <Popover id="popover-basic" {...props}>
        {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
        <Popover.Body>
          <div onClick={onEdit(props)} className="card_container-popover">
            <span>
              <BiCommentEdit></BiCommentEdit>
            </span>
            <span>Edit</span>
          </div>
          <div onClick={onDelete} className="card_container-popover">
            <span>
              <AiOutlineDelete />
            </span>
            <span>Delete</span>
          </div>
        </Popover.Body>
      </Popover>
    );
  };

  return (
    // <BrowserRouter>
    <div className="grid-item">
      {FolderData.map((folder) => (
        <div className="root_card">
          <img src={folder.imageurl} />
          <div class="card_container">
            <div className="card_container-header">
              <Link to= {'/file/' + folder.ID}>
                <b>{folder.folder_name}</b>
              </Link>
              
              {/* <Routes>
                <Route path="/file" element={<FileView />}></Route>
              </Routes> */}
              <div>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={popover({ folder })}
                  rootClose
                >
                  <span className="card_container-svg">
                    <BiDotsVerticalRounded></BiDotsVerticalRounded>
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="card_container-body">
              {folder.filecount != null
                ? "File Count : " + folder.filecount
                : "No Files Yet"}
            </div>
            <div className="card_container-footer">
              <div className="card-lastupd">
                Last Updated : {folder.lastvisited}
              </div>
              <div className="card-fav">
                {folder.favourites == true ? (
                  <AiFillHeart></AiFillHeart>
                ) : (
                  <AiOutlineHeart></AiOutlineHeart>
                )}
              </div>
            </div>
          </div>
        </div>
       
      ))}
      <FolderEditModal
        show={FolderEditModalShow}
        FolderData={CurrentFolderData}
        CategoriesHelp={props.categoryHelp}
        onHide={() => setFolderEditModalShow(false)}
      />
    </div>
    // </BrowserRouter>
  );
};

export default Card;
