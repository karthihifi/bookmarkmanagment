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
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Component, useEffect, useState } from "react";
import FileAddNavbar from "./FileAddNavbar";
import AppBarBottom from "./AppBarBottom";
import "./FileAdd.css";

const FileAdd = () => {
  const [editorState, setContentState] = useState(EditorState.createEmpty());
  const [inputUrlList, setUrlList] = useState([{ title: "", url: "" }]);

  const onEditorStateChange = (editorState) => {
    setContentState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const addRow = () => {
    setUrlList([...inputUrlList, { title: "", url: "" }]);
  };

  const removeRow = (index) => {
    const list = [...inputUrlList];
    list.splice(index, 1);
    setUrlList(list);
  };

  function navbar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
        </AppBar>
      </Box>
    );
  }

  return (
    <div className="FileAdd">
      <FileAddNavbar />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 4, width: "50ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="FileAdd-Container">
          <div>
            <FormControl variant="standard" required>
              <InputLabel htmlFor="my-input">Article Title</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                placeholder="Article Title"
              />
              <FormHelperText id="my-helper-text">
                Enter Article Title.
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" required>
              <InputLabel htmlFor="my-input">Article Category</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                placeholder="Article Category"
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
              />
              <FormHelperText id="my-helper-text">
                Enter Cover Image.
              </FormHelperText>
            </FormControl>
          </div>

          <FormControl variant="standard" sx={{ width: "100ch" }}>
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

          {inputUrlList.map((link, index) => (
            <div className="FileAdd-Reflink">
              <Stack direction="row" spacing={2} sx={{ width: "100ch" }}>
                <FormControl variant="standard" sx={{ width: "40ch" }}>
                  <InputLabel htmlFor="my-input">Article Title</InputLabel>
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    placeholder="Reference Title"
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
        </div>
      </Box>
      <AppBarBottom></AppBarBottom>
    </div>
  );
};
export default FileAdd;
