import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { createCategory } from "./lib/graphql/mutations";
import { useState } from 'react';

interface FolderAddCategoryProps {
    show: boolean;
    onHide: (boolean) => void;
    view: string
}
const FolderCategoryAddModal: React.FC<FolderAddCategoryProps> = (props) => {

    const [category, setCategory] = useState<string>();
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <Form.Control placeholder="Enter new category."
                            onChange={(event) => { setCategory(event.target.value) }} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" size="sm" onClick={() => {
                    console.log(props.view);
                    createCategory("LluX8HIgcvVxilRBsgYc", category).then((resp) => console.log(resp));
                    props.onHide(false);
                }}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default FolderCategoryAddModal;