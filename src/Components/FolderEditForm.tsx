import "bootstrap/dist/css/bootstrap.css";
import { Component, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { folder, category } from "./lib/types/interface";

interface folderEditFormProps {
  CategoriesHelp: category[];
  FolderData: folder;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  newCategory: string;
  onImgUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onfavChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FolderEditForm: React.FC<folderEditFormProps> = (props) => {
  // const FolderEditForm = (props) => {
  const [CategoriesHelp, setCategoriesHelp] = useState<category[]>([]);
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

  // const CategoriesDropdown = () => {
  //   return CategoriesHelp.map((category) => (
  //     <option key={category.category} value={category.category}>
  //       {category.category}
  //     </option>
  //   ));
  // };

  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label
            // size="sm" 
            column sm="2">
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
              {CategoriesHelp.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
              {/* <CategoriesDropdown></CategoriesDropdown> */}
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
              // size="sm"
              type="checkbox"
              id="default-checkbox"
              label="Add to Favourities"
              defaultChecked={props.FolderData.favourities}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FolderEditForm;
