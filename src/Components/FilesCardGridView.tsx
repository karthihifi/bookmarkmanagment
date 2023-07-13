/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useParams } from "react-router-dom";
import { getFileDetails, getCategories } from "./lib/graphql/queries";
import { useEffect, useState } from "react";
import { file } from "./lib/types/interface";
import FileCard from "./FileCard";
import FilesCardGridNavbar from "./FileCardGridNavbar"
// import Container from 'react-bootstrap/Container';
// import { Stack } from "react-bootstrap";
import NavBarRootView from "./NavBarRootView";
import "./FileView.css";

const FilesCardGridView = () => {

    const { id, folder } = useParams();
    let counter = 0;
    const { state } = useLocation();
    if (state != null) {
        const { refresh } = state;
    }

    const [FileData, setFileData] = useState<file[]>([]);

    useEffect(() => {
        getFileDetails("LluX8HIgcvVxilRBsgYc", folder).then((resp) => {
            const { files } = resp;
            if (files != undefined) {
                setFileData(files)
            }
        });

        getCategories("LluX8HIgcvVxilRBsgYc").then((categories) => {
        });
    }, []);

    return (
        <div className="FileView_Grid-root">
            <FilesCardGridNavbar></FilesCardGridNavbar>
            <div className="FileView_Grid">
                {
                    FileData.map((file) => {
                        return (

                            <FileCard fileDetails={file}></FileCard>

                        )
                    })
                }
            </div>
        </div>

    )
}

export default FilesCardGridView;


