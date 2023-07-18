/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useParams } from "react-router-dom";
import { getFileDetails, getFileCategories } from "./lib/graphql/queries";
import { useEffect, useState } from "react";
import { file, category, groupedFile } from "./lib/types/interface";
import FileCard from "./FileCard";
import FileCardGroup from "./FileCardGroup";
import FilesCardGridNavbar from "./FileCardGridNavbar"
// import Container from 'react-bootstrap/Container';
// import { Stack } from "react-bootstrap";
import NavBarRootView from "./NavBarRootView";
import "./FileView.css";

const FilesCardGridView = () => {

    const { id, folder } = useParams();
    console.log('Folder Details', folder, id)
    let counter = 0;
    const { state } = useLocation();
    if (state != null) {
        const { refresh } = state;
    }

    const [FileData, setFileData] = useState<file[]>([]);
    const [CategoryData, setCategoryData] = useState<category[]>([]);
    const [GroupedFileData, setGroupedFileData] = useState<groupedFile[]>([]);

    useEffect(() => {
        Promise.all([getFileDetails("LluX8HIgcvVxilRBsgYc", folder), getFileCategories(id)]).then((response) => {
            const [{ files }, fileCategories] = response;
            setFileData(files)
            setCategoryData(fileCategories)

            let groupedFiles: groupedFile[] = []
            fileCategories.forEach((item) => {
                const filteredFiles = files.filter(fileItem => { return item.category == fileItem.category })
                let groupFile: groupedFile = {
                    category: item.category,
                    count: filteredFiles.length,
                    files: filteredFiles,
                    folder_name: ''
                }
                groupedFiles.push(groupFile)
            })
            setGroupedFileData(groupedFiles);
            console.log(groupedFiles);
        })

    }, []);

    return (
        <div className="FileView_Grid-root">
            <FilesCardGridNavbar></FilesCardGridNavbar>
            <div className="container">
                {GroupedFileData.map((item) => {
                    return (
                        <div>
                            <h4 className="title is-4 FileView_Grid-category" style={{ display: item.count > 0 ? "visible" : "none" }}>{item.category} ({item.count})</h4>
                            <FileCardGroup fileDetails={item.files}></FileCardGroup>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default FilesCardGridView;


{/* <div className="FileView_Grid">
                {
                    FileData.map((file) => {
                        return (

                            <FileCard fileDetails={file}></FileCard>

                        )
                    })
                }
            </div> */}


