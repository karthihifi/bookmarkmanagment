import { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
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
import DeleteConf from "./DeleteConf";

import { folder, category } from "./lib/types/interface"

interface folderCardprops {
  maincategory: string;
  categoryHelp: category[];
  fulldata: folder[];
  setSnackbaropen: (boolean) => void;
  setMsg: (string) => void;
}

let folderDefault: folder = {
  folder_name: '',
  email: '',
  favourities: false,
  filecount: 0,
  ID: '',
  imageurl: '',
  lastvisited: new Date(),
  maincategory: '',
  visitedimes: 0
}
const Card: React.FC<folderCardprops> = (props) => {
  // const Card = (props) => {
  const [FolderData, SetFolderData] = useState<folder[]>([]);
  const [CategoriesHelp, setCategoriesHelp] = useState<category[]>([]);
  const [CurrentFolderData, SetCurrentFolderData] = useState<folder>(folderDefault);
  const [CurrentFolderDatatoDelete, SetCurrentFolderDatatoDelete] = useState(
    {}
  );
  const [FolderEditModalShow, setFolderEditModalShow] = useState(false);
  const [FolderDeleteModalShow, setFolderDeleteModalShow] = useState(false);
  const [CardextradetailsShow, setCardextradetailsShow] = useState(false);

  // const baseURL = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${CurrentFolderDatatoDelete.ID},IsActiveEntity=false)`;

  const UpdateFolderData = (fulldata) => {
    let FolderData = [];


    for (let i = 0; i < fulldata.length; i++) {
      console.log(props.maincategory, fulldata[i].maincategory)
      if (props.maincategory == fulldata[i].maincategory) {
        FolderData.push(fulldata[i]);
      }
    }

    console.log("Card View:", FolderData);
    SetFolderData(FolderData);
  };

  useEffect(() => {
    UpdateFolderData(props.fulldata);
    setCategoriesHelp(props.categoryHelp);
    console.log("cat1", props.categoryHelp);
  }, []);

  const onEdit = (folder: folder) => () => {
    // console.log(folder.folder);
    var popover = document.getElementById("popover-basic");
    popover.classList.remove("show");
    SetCurrentFolderData(folder);
    setFolderEditModalShow(true);
  };

  const onDelete = (folder) => () => {
    // SetCurrentFolderDatatoDelete(folder.folder);
    // console.log(baseURL);
    // let url =
    //   "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=" +
    //   folder.folder.ID +
    //   ",IsActiveEntity=true)";
    // var popover = document.getElementById("popover-basic");
    // popover.classList.remove("show");
    // setFolderDeleteModalShow(true);
    // axios
    //   .delete(url)
    //   .then((response) => console.log(response))
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
          <div onClick={onDelete(props)} className="card_container-popover">
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
          <img className="root_card-img" src={folder.imageurl} />
          <div className="card_container">
            <div className="card_container-header">
              <Link to={"/file/" + folder.ID + "/" + folder.folder_name}>
                <b>{folder.folder_name}</b>
              </Link>
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
              {folder.filecount > 0
                ? "File Count : " + folder.filecount
                : "No Files Yet"}
            </div>
            <div className="card_container-footer">
              <div className="card-lastupd">
                Last Updated : {new Date(folder.lastvisited).toDateString()}
              </div>
              <div className="card-fav">
                {folder.favourities == true ? (
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
        setSnackbaropen={props.setSnackbaropen}
        setMsg={props.setMsg}
      />
      <DeleteConf
        FolderData={CurrentFolderDatatoDelete}
        show={FolderDeleteModalShow}
        onHide={() => setFolderDeleteModalShow(false)}
      ></DeleteConf>
    </div>
    // </BrowserRouter>
  );
};

export default Card;
