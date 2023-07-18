/* eslint-disable react-hooks/rules-of-hooks */
import { file, category, groupedFile } from "./lib/types/interface";
import FileCard from "./FileCard";
import "./FileView.css";

interface fileProps {
    fileDetails: file[]
}

const FileCardGroup: React.FC<fileProps> = (props) => {

    return (
        <div className="FileView_Grid">
            {
                props.fileDetails.map((file) => {
                    return (
                        <FileCard fileDetails={file}></FileCard>
                    )
                })
            }
        </div>

    )
}

export default FileCardGroup;


