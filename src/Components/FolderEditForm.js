import "bootstrap/dist/css/bootstrap.css";
import { Component, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const FolderEditForm = (props) => {
  const [CategoriesHelp, setCategoriesHelp] = useState([]);
  const [maincategory, setmaincategory] = useState("");
  const [UpdatedFolderData, setUpdatedFolderData] = useState({
    ID: "",
    folder_name: "",
    maincategory: "",
    imageurl: "",
    favourites: "",
  });

  useEffect(() => {
    setCategoriesHelp(props.CategoriesHelp);
    setmaincategory(props.FolderData.maincategory);
    console.log("cat", maincategory);
  }, []);

  const CategoriesDropdown = (props) => {
    return CategoriesHelp.map((folder) => (
      <option key={folder} value={folder}>
        {folder}
      </option>
    ));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label size="sm" column sm="2">
            Folder
          </Form.Label>
          <Col sm="10">
            <Form.Control
              size="sm"
              defaultValue={props.FolderData.folder_name}
              onChange={props.onTitleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Select
              size="sm"
              aria-label="Default select example"
              defaultValue={props.FolderData.maincategory}
              value={props.newCategory} //{maincategory}
              onChange={props.onCategoryChange}
              // onChange={(val) => {
              //   // console.log(val.target.value);
              //   setmaincategory(val.target.value);
              //   props.onCategoryChange()
              //   // setUpdatedFolderData(UpdatedFolderData.maincategory = val.target.value);
              // }}
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
              onChange={props.onImgUrlChange}
              size="sm"
              placeholder="New Image"
              defaultValue={props.FolderData.imageurl}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicCheckbox">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              onChange={props.onfavChange}
              size="sm"
              type="checkbox"
              id="default-checkbox"
              label="Add to Favourities"
              defaultChecked={props.FolderData.favourites}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FolderEditForm;
