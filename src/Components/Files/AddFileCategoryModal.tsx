// import 'bulma/css/bulma.min.css';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';

interface addFileCategoryProps {
    show: boolean;
    onHide: (boolean?) => any
}

const AddFileCategoryModal: React.FC<addFileCategoryProps> = (props) => {
    const { id, folder } = useParams();
    const [category, setCategory] = useState<string>();

    return (
        <div className={props.show == true ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={() => props.onHide()}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title has-text-weight-semibold">Add Category</p>
                    <button className="delete" aria-label="close" onClick={() => props.onHide()}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label has-text-weight-medium">Category</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="email" placeholder="Enter Category" />
                                    <span className="icon is-small is-left">
                                        <PlaylistAddOutlinedIcon></PlaylistAddOutlinedIcon>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot" style={{ display: "block" }}>
                    <div className="buttons is-pulled-right">
                        <button className="button is-info is-pulled-right" type="submit" onClick={() => props.onHide()}>Submit</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default AddFileCategoryModal;