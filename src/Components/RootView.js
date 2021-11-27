import { Component, useEffect, Fragment, useState } from "react";
import axios from "axios";
import Card from "./FolderCard";
import NavBarRootView from "./NavBarRootView";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const baseURL =
  "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder";
const headers = { "content-type": "application/json;odata.metadata=minimal" };

const baseUrlCategories =
  "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/VH_categories";
// 'Access-Control-Allow-Origin' : 'http://localhost:3000' }

const RootView = () => {
  const [Categories, setCategories] = useState([]);
  const [FullData, setFullData] = useState([]);
  const [CategoriesHelp, setCategoriesHelp] = useState([]);
  const [Snackbaropen, setSnackbaropen] = useState(false);
  const [Msg, setMsg] = useState("");
  const [Refresh, setRefresh] = useState(false);

  const updateCategories = (fulldata) => {
    let catgories = [];
    let catTemp = [];

    for (let i = 0; i < fulldata.length; i++) {
      catTemp.push(fulldata[i].maincategory);
    }
    catgories = [...new Set(catTemp)];
    setCategories(catgories);
    console.log(FullData);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbaropen(false);
  };

  const action = (
    <Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
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

  useEffect(() => {
    const FolderUrl = axios.get(baseURL);
    const CategoriesUrl = axios.get(baseUrlCategories);
    let CategoriesHelp = [];

    axios
      .all([FolderUrl, CategoriesUrl])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          console.log(
            "test val",
            Object.values(responseTwo.data.value)[0].maincategory
          );
          Object.values(responseTwo.data.value).forEach((item) =>
            CategoriesHelp.push(item.maincategory)
          );
          setFullData(responses[0].data.value);
          updateCategories(responses[0].data.value);
          setCategoriesHelp(CategoriesHelp);
        })
      )
      .catch((errors) => {
        // react on errors.
      });

    // axios.get(baseURL, { headers }).then((resp) => {
    //   setFullData(resp.data.value);
    //   updateCategories(resp.data.value);
    // });
  }, []);

  // const updatedCategories = Categories.map((cat) => {
  //   return <li>{cat}</li>;
  // });

  return (
    <div>
      <NavBarRootView
        view="Folder"
        Categories={Categories}
        Msg={Msg}
        setMsg={setMsg}
        setSnackbaropen={setSnackbaropen}
      />
      <div>
        {Categories.map((name) => (
          <div>
            <div className="grid-item_header">{name}</div>
            <Card
              maincategory={name}
              categoryHelp={CategoriesHelp}
              fulldata={FullData}
            ></Card>
          </div>
        ))}
      </div>
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
