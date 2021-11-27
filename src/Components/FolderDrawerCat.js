import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const FolderDrawerCat = (props) => {
  // console.log(props);
  const SetSelectedCategory = (event) => {
    // console.log(event.target.outerText);
    let cont = document.getElementById("RootView-Container");
    for (let i = 0; i < cont.childNodes.length; i++) {
      let classname = cont.childNodes[i].classList[0].split(
        "RootView-Container_"
      )[1];
      let val = event.target.outerText
      console.log(classname,val)
      if (classname != val) {
        cont.childNodes[i].style.display = "none";
        console.log(classname,event.target.outerText)
      } 
      else {
        cont.childNodes[i].style.display = "block";
      }
    }
  };
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {props.Category.map((text, index) => (
          <ListItemButton key={text}>
            <ListItemText
              value={text}
              primary={text}
              onClick={SetSelectedCategory}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default FolderDrawerCat;
