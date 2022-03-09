import { Component, useEffect, useState, Fragment } from "react";
import * as React from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./FileView.css";
import NavBarRootView from "./NavBarRootView";
import { Breadcrumb } from "react-bootstrap";
import { BiX, BiCommentEdit } from "react-icons/bi";
import {
  MdOutlineClose,
  MdOutlineSortByAlpha,
  MdOutlineUpdate,
  MdVisibility,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import DeleteConfFile from "./DeleteConfFile";
import LoadingScreen from "./LoadingScreen";
import { set } from "draft-js/lib/EditorState";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Popover,
  Overlay,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { values } from "draft-js/lib/DefaultDraftBlockRenderMap";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const cat = [];
const FileView = () => {
  const [FullData, setFullData] = useState([]);
  const [FullDefaultData, setFullDefaultData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [Refresh, setRefresh] = useState(false);
  const [Snackbaropen, setSnackbaropen] = useState(false);
  const [successMsg, setsuccessMsg] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);
  const [Msg, setMsg] = useState(false);
  const [CurrentFileDatatoDelete, SetCurrentFileDatatoDelete] = useState({});
  const [FileDeleteModalShow, setFileDeleteModalShow] = useState(false);

  const [LoadingDone, setLoadingDone] = useState(true);
  const [StartIndex, setStartIndex] = useState(0);
  const [EndIndex, setEndIndex] = useState(3);
  const [FullLength, setFullLength] = useState(0);

  // const success = `New Aritcle Added.Click <a href="#">here</a> to refresh...!`
  let { id, folder } = useParams();
  let counter = 0;
  const { state } = useLocation();
  console.log("Asdas", state);
  if (state != null) {
    const { refresh } = state;
  }

  let baseURL = `https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=true)/files?$count=true&$orderby=visitedtimes%20desc`;

  const baseURL1 =
    "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/Folder(ID=d0ad8a57-a423-435e-9deb-84497e866330,IsActiveEntity=true)/files(ID=935a6833-53f9-4c3a-a115-715ec2c22a5c,IsActiveEntity=true)/file_path";

  let Category = ["All"];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbaropen(false);
  };

  // const CheckFileAddMsg = () => {
  //   // return()
  //   if (successMsg == true) {
  //     <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
  //       New Aritcle Added.Click <a href="#">here</a> to refresh...!
  //     </Alert>;
  //   } else if (ErrorMsg == true) {
  //     <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
  //       Error Occured!
  //     </Alert>;
  //   }
  // };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const onDelete = (file) => () => {
    // console.log(file);
    SetCurrentFileDatatoDelete(file);
    setFileDeleteModalShow(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("asa",state)
    let authToken = sessionStorage.getItem("Auth Token");
    if (auth.currentUser == null && authToken == null) {
      navigate("/signin");
      return;
    }

    if (window.location.pathname.split("/")[4] == "refresh") {
      setSnackbaropen(true);
      setsuccessMsg(true);
      setMsg(true);
    }
    // if (state != null) {
    //   console.log(
    //     "Refresh",
    //     Refresh,
    //     "State",
    //     state.refresh,
    //     "Metod",
    //     state.setRefresh
    //   );
    //   setSnackbaropen(true);
    //   setsuccessMsg(true);
    //   setMsg(true);
    // }

    const FileUrl = axios.get(baseURL);
    // const FileUrl1 = axios.get(baseURL1);
    let CategoriesHelp = [];

    axios
      .all([FileUrl])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          // const responseTwo = responses[1]
          // console.log(responseOne.data);
          setFullData(responseOne.data.value);
          setFullDefaultData(responseOne.data.value);
          setFullLength(Math.ceil(responseOne.data.value.length / 3));
          for (let index = 0; index < responseOne.data.value.length; index++) {
            // Category.push(responseOne.data.value[index].category);
            let tempfilter = responseOne.data.value.filter(
              (item) => item.category == responseOne.data.value[index].category
            );
            console.log(
              responseOne.data.value[index].category,
              tempfilter.length
            );
            Category.push(
              responseOne.data.value[index].category +
                "(" +
                tempfilter.length +
                ")"
            );
          }
          const cat1 = [...new Set(Category)];
          // console.log("set",cat1)
          setCategoryData(cat1);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, []);

  // var location: Location;
  // const homeurl = location.host;
  // let history = useHistory();
  // const goToPreviousPath = () => {
  //     history.goBack()
  // }

  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <div className="card_container-popover">
          <span>
            <MdOutlineUpdate></MdOutlineUpdate>
          </span>
          <span
            onClick={() => {
              let newFullData = [...FullData];
              console.log("newFullData", newFullData);
              newFullData.sort((a, b) => {
                let da = new Date(a.lastupdate),
                  db = new Date(b.lastupdate);
                return da - db;
              });
              setFullData(newFullData);
              console.log(newFullData);
              var popover = document.getElementById("popover-basic");
              popover.classList.remove("show");
            }}
          >
            By LastUpdated
          </span>
        </div>
        <div className="card_container-popover">
          <span>
            <MdVisibility />
          </span>
          <span
            onClick={() => {
              let newFullData = [...FullData];
              // console.log("newFullData", newFullData);
              newFullData.sort((a, b) => {
                let da = a.visitedtimes,
                  db = b.visitedtimes;
                return db - da;
              });
              setFullData(newFullData);
              console.log(newFullData);
              var popover = document.getElementById("popover-basic");
              popover.classList.remove("show");
            }}
          >
            By VisitedTimes
          </span>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="FileView-root">
      <NavBarRootView
        folder={folder}
        FolderId={id}
        view="File"
        Categories={CategoryData}
        setFullData={setFullData}
        FullData={FullData}
        FullDefaultData={FullDefaultData}
        setStartIndex={setStartIndex}
        setEndIndex={setEndIndex}
        setFullLength={setFullLength}
      />
      {LoadingDone == false ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div>
          <div className="FileView-header">
            <h2>Discover New Possiblities</h2>
            <div className="FileView-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item href={window.location.origin}>
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{folder}</Breadcrumb.Item>
              </Breadcrumb>
              <div>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={popover}
                  rootClose
                >
                  <span className="FileView-filter">
                    <MdOutlineSortByAlpha></MdOutlineSortByAlpha>
                  </span>
                </OverlayTrigger>
              </div>
              {/* <span className="FileView-filter">
                <MdOutlineSortByAlpha></MdOutlineSortByAlpha>
              </span> */}
            </div>
          </div>
          <div id="FileView-Container">
            {FullData.map(
              (file, index) =>
                index >= StartIndex &&
                index < EndIndex && (
                  <div
                    className={
                      "FileView" +
                      " " +
                      "FileView_" +
                      file.category.replace(/\s/g, "")
                    }
                  >
                    <div className="FileView-content">
                      <img className="FileView-img" src={file.imageurl}></img>
                      <Link
                        to={
                          "/file/" +
                          id +
                          "/" +
                          folder +
                          "/" +
                          file.ID +
                          "/" +
                          file.title
                        }
                      >
                        <h3 className="FileView-header1">{file.title}</h3>
                      </Link>

                      {/* <div className="FileView-date">{file.lastvisited}</div> */}
                      <span onClick={onDelete(file)} className="FileView-date">
                        <MdOutlineClose />
                      </span>
                      <p></p>
                      <div
                        className="FileView-comment"
                        dangerouslySetInnerHTML={{ __html: file.comments }}
                      />
                      {/* <p className="FileView-comment">{file.comments}</p> */}
                      <p></p>
                    </div>
                  </div>
                )
            )}
          </div>
          <Stack className="FileView-footer" spacing={2}>
            <Pagination
              count={FullLength}
              color="primary"
              onChange={(event, value) => {
                setStartIndex((value - 1) * 3);
                setEndIndex(value * 3);
                console.log(StartIndex, EndIndex);
              }}
            />
          </Stack>
          <Snackbar
            open={Snackbaropen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            {successMsg == true ? (
              <Alert
                onClose={handleClose}
                severity="info"
                sx={{ width: "100%" }}
              >
                New Aritcle Added.Click{" "}
                <a href={window.location.href.replace("/refresh", "")}>here</a>{" "}
                to refresh...!
              </Alert>
            ) : ErrorMsg == true ? (
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Error Occured!
              </Alert>
            ) : (
              ""
            )}
          </Snackbar>
          <DeleteConfFile
            FolderId={id}
            FileData={CurrentFileDatatoDelete}
            show={FileDeleteModalShow}
            setLoadingDone={setLoadingDone}
            onHide={() => setFileDeleteModalShow(false)}
          ></DeleteConfFile>
        </div>
      )}
    </div>
  );
};

export default FileView;
