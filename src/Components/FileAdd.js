import { FormControl, Box, OutlinedInput } from "@mui/material";
import { TextField, Input, InputLabel, FormHelperText } from "@mui/material";
import "./FileAdd.css";

const FileAdd = () => {
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
        </div>
      </Box>
    </div>
  );
};
export default FileAdd;
