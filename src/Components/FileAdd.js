import {
  FormControl,
  Box,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  OutlinedInput,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  TextField,
  Button,
  Input,
  InputLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
// import { htmlToText } from "html-to-text";
import { Component, useEffect, useState, useParams } from "react";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FileAddNavbar from "./FileAddNavbar";
import AppBarBottom from "./AppBarBottom";
import NavBarRootView from "./NavBarRootView";
import "./FileAdd.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const FileAdd = (props) => {
  // let { id } = useParams();
  // console.log("File Add", id);

  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (auth.currentUser == null && authToken == null) {
      navigate("/signin");
      return;
    }
  });

  const [editorState, setContentState] = useState(EditorState.createEmpty());
  const [inputUrlList, setUrlList] = useState([{ title: "", url: "" }]);
  const [inputTagList, setTagList] = useState([""]);

  const [FileTitle, setFileTitle] = useState("");
  const [FileCat, setFileCat] = useState("");
  const [FileImgurl, setFileFileImgurl] = useState("");
  const [FileComments, setFileComments] = useState("");
  const [FileReference, setFileReference] = useState([{ title: "", url: "" }]);
  const [FileTags, setFileTags] = useState([""]);

  const [FileTitleError, setFileTitleError] = useState(false);
  const [FileCatError, setFileCatError] = useState(false);
  const [FileCommentsError, setFileCommentsError] = useState(false);

  const [LoadingDone, setLoadingDone] = useState(true);
  const [Refresh, setRefresh] = useState(false);

  // let history = useHistory();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#212529",
        light: "#212529",
        dark: "#212529",
      },
    },
  });

  const onEditorStateChange = (editorState) => {
    setFileCommentsError(false);
    setContentState(editorState);
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setFileComments(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log(FileComments);
  };

  const addRow = () => {
    setUrlList([...inputUrlList, { title: "", url: "" }]);
    setFileReference([...FileReference, { title: "", url: "" }]);
  };

  const removeRow = (index) => {
    const list = [...inputUrlList];
    list.splice(index, 1);
    setUrlList(list);

    const list1 = [...FileReference];
    list1.splice(index, 1);
    setFileReference(list1);
  };

  const addTagRow = () => {
    setTagList([...inputTagList, ""]);
    setFileTags([...FileTags, ""]);
  };

  const removeTagRow = (index) => {
    const list = [...inputTagList];
    list.splice(index, 1);
    setTagList(list);

    const list1 = [...FileTags];
    list1.splice(index, 1);
    setFileTags(list1);
  };

  let payload = {
    // "ID": "935a6833-53f9-4c3a-a115-715ec2c22a5c",
    category: FileCat,
    comments: FileComments,
    title: FileTitle,
    imageurl: FileImgurl,
    favourites: null,
  };

  console.log(payload);
  let RefList = FileReference;
  let tagList = FileTags;

  // if (useLocation() != null) {
  //   const { state } = useLocation();

  //   const { id, folder } = state;
  // }
  const { state } = useLocation();

  const { id, folder } = state;
  console.log("/file/" + id + folder);
  let newID = "";
  let newPathID = "";
  let newtagID = "";

  const basurl = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/ContentManagService.draftEdit`;
  const basurl1 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/files`;
  let basurl2 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/files(ID=${newID},IsActiveEntity=false)`;
  // const basurl3 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/files`;

  let basurl3 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/filesID=${newID},IsActiveEntity=false)/file_path`;
  let basurl4 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/file_path(ID=${newPathID},IsActiveEntity=false)`;

  let basurl5 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/filesID=${newID},IsActiveEntity=false)/tags`;
  let basurl6 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/file_path(ID=${newtagID},IsActiveEntity=false)`;

  const basurl7 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/ContentManagService.draftPrepare`;
  const basurl8 = `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/ContentManagService.draftActivate`;

  console.log(basurl);

  const addArticle = () => {
    let error = false;

    if (FileTitle == null || FileTitle == "") {
      console.log("Title cannot be empty");
      setFileTitleError(true);
      error = true;
    }

    if (FileCat == null || FileCat == "") {
      console.log("Category cannot be empty");
      setFileCatError(true);
      error = true;
    }

    let tempComment = FileComments.replace(/<[^>]+>/g, "").trim();
    console.log("aa", tempComment);
    if (tempComment == null || tempComment == "") {
      console.log("Comments cannot be empty");
      setFileCommentsError(true);
      error = true;
    }

    if (error == true) {
      return;
    }
    // console.log(FileTitle);
    setLoadingDone(false);
    axios.post(basurl, { PreserveChanges: true }).then((response) => {
      axios.post(basurl1, {}).then((response) => {
        console.log(response);
        newID = response.data.ID;
        basurl2 =
          "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/files(ID=" +
          newID +
          ",IsActiveEntity=false)";
        axios.patch(basurl2, payload).then((response) => {
          if (RefList.length > 0) {
            for (let i = 0; i < RefList.length; i++) {
              let payload1 = {
                title: RefList[i].title,
                url: RefList[i].url,
              };
              basurl3 =
                `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/files(ID=` +
                newID +
                ",IsActiveEntity=false)/file_path";
              axios.post(basurl3, {}).then((response) => {
                newPathID = response.data.ID;
                basurl4 =
                  "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/file_path(ID=" +
                  newPathID +
                  ",IsActiveEntity=false)";
                axios.patch(basurl4, payload1).then((response) => {});
              });
            }
          }
          if (tagList.length > 0) {
            for (let i = 0; i < tagList.length; i++) {
              let payload2 = { tag_name: tagList[i] };
              basurl5 =
                `https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/Folder(ID=${id},IsActiveEntity=false)/files(ID=` +
                newID +
                ",IsActiveEntity=false)/tags";
              axios.post(basurl5, {}).then((response) => {
                newtagID = response.data.ID;
                basurl6 =
                  "https://5aa7bb4ftrial-dev-contentmanagement-srv.cfapps.eu10.hana.ondemand.com/content-manag/tag_path(ID=" +
                  newtagID +
                  ",IsActiveEntity=false)";
                axios.patch(basurl6, payload2).then((response) => {});
              });
            }
          }
          axios.post(basurl7, {}).then((response) => {
            axios.post(basurl8, {}).then((response) => {});
          });
          setRefresh(true);
          setLoadingDone(true);
          // history.go(0)
          navigate(
            "/file/" + id + "/" + folder + "/refresh",
            { replace: true },
            { state: { refresh: { Refresh } } }
          );
          // navigate(-1);
        });
      });
    });
  };

  function navbar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <NavBarRootView></NavBarRootView>
        {/* <ThemeProvider theme={darkTheme}> */}
        {/* <AppBar position="static" color="primary" theme={darkTheme}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar> */}
        {/* </ThemeProvider> */}
      </Box>
    );
  }

  const errortit = true;

  return (
    <div className="FileAdd">
      {/* <FileAddNavbar /> */}
      <NavBarRootView view="FileViewAdd"></NavBarRootView>
      {LoadingDone == false ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "50ch" },
          }}
          noValidate
          autoComplete="on"
        >
          <div className="FileAdd-Container">
            <section>
              <h4 className="FileAdd-header">Main Section</h4>
              <FormControl
                error={FileTitleError}
                variant="standard"
                required
                sx={{ mr: 4 }}
              >
                <InputLabel htmlFor="my-input">Article Title</InputLabel>
                <Input
                  onChange={(event) => {
                    setFileTitle(event.target.value);
                    setFileTitleError(false);
                    // console.log(FileTitle)
                  }}
                  id="my-input"
                  aria-describedby="my-helper-text"
                  placeholder="Article Title"
                />
                <FormHelperText id="my-helper-text">
                  Enter Article Title.
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard" error={FileCatError} required>
                <InputLabel htmlFor="my-input">Article Category</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  placeholder="Article Category"
                  onChange={(event) => {
                    setFileCat(event.target.value);
                    setFileCatError(false);
                    // console.log(FileTitle)
                  }}
                />
                <FormHelperText id="my-helper-text">
                  Enter Article Category.
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard" sx={{ width: "100ch" }}>
                <InputLabel htmlFor="my-input">Article Image</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  placeholder="Article Image"
                  onChange={(event) => {
                    setFileFileImgurl(event.target.value);
                    // console.log(FileTitle)
                  }}
                />
                <FormHelperText id="my-helper-text">
                  Enter Cover Image.
                </FormHelperText>
              </FormControl>
            </section>

            <FormControl
              variant="standard"
              error={FileCommentsError}
              sx={{ width: "100ch", mb: 4 }}
            >
              <InputLabel htmlFor="DraftEditor">Comments</InputLabel>
              {/* <div>Comments</div> */}
              <div className="FileAdd-commentEditor">
                <Editor
                  id="DraftEditor"
                  editorState={editorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
            </FormControl>
            <section className="FileAdd-refsec">
              <h4 className="FileAdd-header">Reference Section</h4>
              {inputUrlList.map((link, index) => (
                <div className="FileAdd-Reflink">
                  <Stack direction="row" spacing={2} sx={{ width: "100ch" }}>
                    <FormControl variant="standard" sx={{ width: "40ch" }}>
                      <InputLabel htmlFor="my-input">Article Title</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        placeholder="Reference Title"
                        onChange={(event) => {
                          let newrefitems = [...FileReference];
                          newrefitems[index].title = event.target.value;
                          setFileReference(newrefitems);
                        }}
                      />
                      <FormHelperText id="my-helper-text">
                        Enter Ref. Title.
                      </FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ width: "75ch" }}>
                      <InputLabel htmlFor="my-input">Reference Link</InputLabel>
                      <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        placeholder="Reference Title"
                        onChange={(event) => {
                          let newrefitems = [...FileReference];
                          newrefitems[index].url = event.target.value;
                          setFileReference(newrefitems);
                        }}
                      />
                      <FormHelperText id="my-helper-text">
                        Enter Ref. Link.
                      </FormHelperText>
                    </FormControl>
                    <Stack direction="row" spacing={2} sx={{ width: "50ch" }}>
                      <Button size="small" onClick={() => addRow(index)}>
                        Add Row
                      </Button>
                      {index == 0 ? (
                        ""
                      ) : (
                        <Button size="small" onClick={() => removeRow(index)}>
                          Delete Row
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </div>
              ))}
            </section>
            <section className="FileAdd-tagsec">
              <h4>Tags Section</h4>
              {inputTagList.map((tag, index) => (
                <Stack direction="row" spacing={2} sx={{ width: "100ch" }}>
                  <FormControl variant="standard" sx={{ width: "15ch" }}>
                    <InputLabel htmlFor="my-input">Tag</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      placeholder="Enter Tag"
                      onChange={(event) => {
                        let newrefitems = [...FileTags];
                        // console.log(newrefitems)
                        newrefitems[index] = event.target.value;
                        setFileTags(newrefitems);
                        // console.log(FileTags)
                      }}
                    />
                    <FormHelperText id="my-helper-text">
                      Enter Tag. Title.
                    </FormHelperText>
                  </FormControl>

                  <Stack direction="row" spacing={2} sx={{ width: "50ch" }}>
                    <Button
                      sx={{}}
                      size="small"
                      onClick={() => addTagRow(index)}
                    >
                      Add Row
                    </Button>
                    {index == 0 ? (
                      ""
                    ) : (
                      <Button size="small" onClick={() => removeTagRow(index)}>
                        Delete Row
                      </Button>
                    )}
                  </Stack>
                </Stack>
              ))}
            </section>
          </div>
        </Box>
      )}
      <AppBarBottom addArticle={addArticle}></AppBarBottom>
    </div>
  );
};
export default FileAdd;
