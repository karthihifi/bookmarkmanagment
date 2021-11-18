import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FaUserCircle, FaMeteor } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AppBarBottom.css";
import { red } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import { createTheme } from "@mui/material/styles";
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const red1 = red[500];
const theme = createTheme({
  palette: {
    primary: {
      light: "#607d8b",
      main: "#607d8b",
      dark: "#607d8b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    orange: {
      light: "#f44336",
      main: "#f44336",
      dark: "#f44336",
      contrastText: "#fff",
    },
  },
});



export default function AppBarBottom() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="AppBarBottom-col"
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
        theme = {theme}
      >
        {/* <Toolbar> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* <FaMeteor size="20px" /> */}
        </Typography>
        <div className="AppBarBottom-btn">
          {/* <Fab variant="extended"> */}
          {/* Submit */}
          <Button size="small" variant="contained">
            Submit
          </Button>
          {/* </Fab> */}
          {/* <Fab variant="extended"> */}
          {/* Cancel */}
          <Button size="small" variant="contained">
            Cancel
          </Button>
          {/* </Fab> */}
        </div>
        {/* </Toolbar> */}
      </AppBar>
    </Box>
  );
}
