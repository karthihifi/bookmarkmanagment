import { Component, useEffect, Fragment, useState } from "react";
import Card from "./FolderCard";
import NavBarRootView from "./NavBarRootView";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./RootView.css";
import LoadingScreen from "./LoadingScreen";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { folder, category } from "./lib/types/interface";
import { getFolder, getCategories } from "./lib/graphql/queries";

const auth = getAuth();

const RootView = () => {
  const [Categories, setCategories] = useState<category[]>([]);
  const [Categoriessidebar, setCategoriessidebar] = useState<category[]>([]);
  const [FullData, setFullData] = useState<folder[]>([]);
  const [CategoriesHelp, setCategoriesHelp] = useState<category[]>([]);
  const [Snackbaropen, setSnackbaropen] = useState<boolean>(false);
  const [Msg, setMsg] = useState<string>("");
  const [LoadingDone, setLoadingDone] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbaropen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        aria-label="close"
        size="small"
        color="inherit"
        onClick={() => handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (auth.currentUser == null && authToken == null) {
      navigate("/signin");
      return;
    }
    // let CategoriesHelp = [];

    getFolder("LluX8HIgcvVxilRBsgYc").then((folders) => {
      // console.log("Folders :", folders);
      setFullData(folders);
      setLoadingDone(true);
    });

    getCategories("LluX8HIgcvVxilRBsgYc").then((categories) => {
      console.log(categories);
      setCategories(categories);
      setCategoriessidebar(categories);
      setCategoriesHelp(categories);
    });
  }, []);

  return (
    <div>
      <NavBarRootView
        view="Folder"
        Categories={Categoriessidebar}
        Msg={Msg}
        setMsg={setMsg}
        setSnackbaropen={setSnackbaropen}
        LoadingDone={LoadingDone}
        setLoadingDone={setLoadingDone}
      />
      {LoadingDone == false ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div id="RootView-Container" className="RootView-Container">
          {Categories.map((item) => (
            <div
              className={"RootView-Container" + "_" + item.category}
              style={{ display: item.count > 0 ? "visible" : "none" }}
            >
              <div className="grid-item_header">{item.category}</div>
              <Card
                maincategory={item.category}
                categoryHelp={CategoriesHelp}
                fulldata={FullData}
                setSnackbaropen={setSnackbaropen}
                setMsg={setMsg}
              ></Card>
            </div>
          ))}
        </div>
      )}
      <Snackbar
        open={Snackbaropen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={Msg}
        action={action}
      />
    </div>
  );
};

export default RootView;
