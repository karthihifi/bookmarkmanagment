import { FormControl, Box, OutlinedInput } from "@mui/material";
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
import "./FileAdd.css";

const FileAdd = () => {
  const [editorState, setContentState] = useState(EditorState.createEmpty());
  const [inputUrlList, setUrlList] = useState([{ title: "", url: "" }]);

  const onEditorStateChange = (editorState) => {
    setContentState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className="FileAdd">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 4, width: "50ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="FileAdd-Container">
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
                  <Button size="small">Add Row</Button>
                  {index == 0 ? "" : <Button size="small">Delete Row</Button>}
                </Stack>
              </Stack>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};
export default FileAdd;
