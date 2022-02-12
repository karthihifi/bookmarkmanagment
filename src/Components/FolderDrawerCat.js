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
  console.log(props);
  const SetSelectedCategory = (event) => {
    // console.log(event.target.outerText);
    let cont = "";
    let classname = "";
    if (props.view == "File") {
      cont = document.getElementById("FileView-Container");
    } else {
      cont = document.getElementById("RootView-Container");
    }

    if (event.target.outerText == "All") {
      if (props.view == "File") {
        props.setFullData(props.FullDefaultData);
        props.setFullLength(Math.ceil(props.FullDefaultData.length / 3));
        // props.setStartIndex(1);
        // props.setEndIndex(Math.ceil(props.FullDefaultData.length / 3));
      }

      for (let i = 0; i < cont.childNodes.length; i++) {
        cont.childNodes[i].style.display = "block";
      }
      return;
    }
    if (cont == undefined) {
      return;
    }

    // console.log(props.view,"cont",cont)

    for (let i = 0; i < cont.childNodes.length; i++) {
      if (props.view == "File") {
        classname = cont.childNodes[i].classList[1].split("FileView_")[1];
      } else {
        classname = cont.childNodes[i].classList[0].split(
          "RootView-Container_"
        )[1];
      }

      let val = event.target.outerText;
      // val = val.split(" ").join("");
      // console.log(val,classname)
      // if (props.view == "File") {
      //   val = val.replace(/\s/g, "");
      // }
      if (props.view != "File") {
        if (classname != val) {
          cont.childNodes[i].style.display = "none";
          // console.log("none",cont.childNodes[i].style.display)
        } else {
          cont.childNodes[i].style.display = "block";
          // console.log("block",cont.childNodes[i].style.display)
        }
      }
    }

    if (props.view == "File") {
      let val = event.target.outerText.split('(')[0];
      // val = val.replace(/\s/g, "");
      // console.log(val);
      val = val.split(' ');
      console.log(event.target.outerText,val,"assa")
      val = val.join(' ');
      console.log(val,"test")
      let temparr = props.FullDefaultData;
      let filteredcat = temparr.filter((file) => {
        return file.category == val;
      });
      console.log('filteredcat',filteredcat)
      if (filteredcat != undefined) {
        // console.log("filteredcat", filteredcat);
        props.setStartIndex(0);
        props.setEndIndex(3);
        props.setFullData(filteredcat);
        props.setFullLength(Math.ceil(filteredcat.length / 3));
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
