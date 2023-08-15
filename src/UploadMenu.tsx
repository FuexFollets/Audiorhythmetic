import { useState } from "react";
import Draggable from "react-draggable";

import FileListing from "./FileListing.tsx";
import "./index.css";

function UploadMenu(props: { fileList: (files: File) => void }) {
    const [buttonText, setButtonText] = useState("Upload");
    const [fileState, setFileState] = useState<File | undefined>(undefined);
    const [buttonIsDisplayingUndefined, setButtonIsDisplayingUndefined] =
        useState(false);

    let soundFile: File;

    async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            soundFile = event.target.files[0];
            setFileState(soundFile);
        }

        if (buttonIsDisplayingUndefined) {
            setButtonText("Add");
            setButtonIsDisplayingUndefined(false);
        }
    }

    async function addSoundFile() {
        if (fileState === undefined) {
            setButtonText("No file chosen");
            setButtonIsDisplayingUndefined(true);
        }

        else if (fileState) {
            props.fileList(fileState);
            setButtonText(`Successfully added "${fileState.name}"`);
        }
    }

    return (
        <Draggable>
            <div className="widget">
                <input type="file" onChange={handleFile} />
                <button onClick={addSoundFile}>{buttonText}</button>
            </div>
        </Draggable>
    );
}

export default UploadMenu;
