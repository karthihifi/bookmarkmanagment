import { file } from "./lib/types/interface";
import {
    Image, Badge, Stack
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Typography } from "@mui/material";
import "./FileView.css";
import 'bulma/css/bulma.min.css';
import Link from '@mui/material/Link';

interface fileProps {
    fileDetails: file
}

const FileCard: React.FC<fileProps> = (props) => {
    return (
        <div className="FileView_Grid-Card">
            <div className="content">
                <Image className="FileView_Grid-Card_img" src={props.fileDetails.imageurl} fluid></Image>
                <div className="FileView_Grid-content">
                    <div className="FileView_Grid-Header my-3">
                        <p className="title is-5 px-1 FileView_Grid-Title">
                            {props.fileDetails.title}
                        </p>
                        <h2 className="subtitle is-6 px-1">
                            {props.fileDetails.category}
                        </h2>
                    </div>

                    <div className="FileView_Grid-Footer">
                        <div className="is-size-7 has-text-weight-medium px-1">
                            {new Date(props.fileDetails.lastvisited).toDateString()}
                        </div>
                        <div className="mb-2 px-1 my-2">
                            <Stack direction="horizontal" gap={2}>
                                {
                                    props.fileDetails.references.map((item) => {
                                        return (
                                            <Link className="is-active is-size-7 has-text-weight-medium has-text-info FileView_Grid-Link" target="_blank" href={item.url}>{item.title}</Link>
                                        )
                                    })
                                }
                            </Stack>
                            <Stack className="my-1" direction="horizontal" gap={2}>
                                {
                                    props.fileDetails.tags.map((item) => {
                                        return (
                                            <Badge bg="warning">
                                                {item}
                                            </Badge>
                                        )
                                    })
                                }
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileCard;