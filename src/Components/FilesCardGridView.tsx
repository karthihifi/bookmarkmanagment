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
import LoadingScreen from "./LoadingScreen"
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
    const [AllData, setAllData] = useState<groupedFile[]>([]);
    const [LoadingDone, setLoadingDone] = useState(false);

    const searchFiles = (searchValue: string) => {
        if (searchValue.trim() !== '') {
            console.log(searchValue)
            const filteredData = AllData.map((category) => {
                const files = category.files.filter((item) => {
                    if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
                        return item
                    }
                })
                return {
                    category: category.category,
                    count: files.length,
                    files: files,
                    folder_name: category.folder_name
                }
            })
            setGroupedFileData(filteredData)
            console.log(filteredData)
        } else {
            setGroupedFileData(AllData)
        }
    }

    useEffect(() => {
        Promise.all([getFileDetails("LluX8HIgcvVxilRBsgYc", folder), getFileCategories(id)]).then((response) => {
            const [{ files }, fileCategories] = response;
            setFileData(files)
            setCategoryData(fileCategories);
            console.log('fileCategories : ', fileCategories);

            let groupedFiles: groupedFile[] = []
            fileCategories.forEach((item) => {
                const filteredFiles = files.filter(fileItem => { return item.category === fileItem.category })
                let groupFile: groupedFile = {
                    category: item.category,
                    count: filteredFiles.length,
                    files: filteredFiles,
                    folder_name: ''
                }
                groupedFiles.push(groupFile)
            })
            setGroupedFileData(groupedFiles);
            setAllData(groupedFiles);
            setLoadingDone(true)
            console.log(groupedFiles);
        })

    }, []);

    return (
        <div className="FileView_Grid-root">
            <FilesCardGridNavbar categories={CategoryData} searchFiles={searchFiles}></FilesCardGridNavbar>
            {LoadingDone === false ? (
                <LoadingScreen></LoadingScreen>
            ) : (
                <div className="container">
                    {GroupedFileData.map((item) => {
                        return (
                            <section id={item.category}>
                                <h4 className="has-text-weight-bold is-size-4 FileView_Grid-category" style={{ display: item.count > 0 ? "visible" : "none" }}>{item.category} ({item.count})</h4>
                                <FileCardGroup fileDetails={item.files}></FileCardGroup>
                            </section>
                        )
                    })}
                </div>
            )}
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


