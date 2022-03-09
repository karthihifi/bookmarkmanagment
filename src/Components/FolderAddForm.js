import { Component, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { PinDropSharp } from "@mui/icons-material";

const FolderAddForm = (props) => {
  const baseUrlCategories =
    "https://b8076800trial-dev-contentmanagement-srv.cfapps.us10.hana.ondemand.com/content-manag/VH_categories";
  // 'Access-Control-Allow-Origin' : 'http://localhost:3000' }

  const [CategoriesHelp, setCategoriesHelp] = useState([]);

  useEffect(() => {
    const CategoriesUrl = axios.get(baseUrlCategories);
    let CategoriesHelp = [];

    axios
      .all([CategoriesUrl])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          Object.values(responseOne.data.value).forEach((item) =>
            CategoriesHelp.push(item.maincategory)
          );
          setCategoriesHelp(CategoriesHelp);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, []);

  // console.log("Form", props);
  const CategoriesDropdown = (props) => {
    return CategoriesHelp.map((folder) => (
      <option key={folder} value={folder}>
        {folder}
      </option>
    ));
  };

  return (
    <div>
      <Form validated={props.validated} onSubmit={props.handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label size="sm" column sm="2">
            Folder
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              size="sm"
              onChange={(event) => {
                console.log(event.target.value);
                props.setFolderName(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Select
              required
              size="sm"
              aria-label="Default select example"
              //   defaultValue={props.FolderData.maincategory}
              value={props.Category}
              onChange={(val) => {
                props.setCategory(val.target.value);
              }}
            >
              <CategoriesDropdown></CategoriesDropdown>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Image Link
          </Form.Label>
          <Col sm="10">
            <Form.Control
              size="sm"
              placeholder="New Image"
              onChange={(event) => {
                props.setImageurl(event.target.value);
              }}
              //   defaultValue={props.FolderData.imageurl}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicCheckbox">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              size="sm"
              type="checkbox"
              id="default-checkbox"
              label="Add to Favourities"
              onChange={(event) => {
                props.setFav(event.target.checked);
                console.log(event.target.checked)
              }}
              //   defaultChecked={props.FolderData.favourites}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
export default FolderAddForm;
