import { useState, useCallback } from "react";

import UploadMenu from "./UploadMenu.tsx";
import FileInstance from "./FileInstance.tsx";

function Workspace() {
    const [soundFileWidgets, setSoundFileWidgets] = useState<File[]>([]);
    const uploadedSoundFiles = useCallback((file: File) => {
        setSoundFileWidgets([...soundFileWidgets, file]);

    }, [soundFileWidgets]);

    let elementCounter = 0;
    return (
        <>
            <UploadMenu fileList={uploadedSoundFiles}></UploadMenu>
            {
                soundFileWidgets.map((file) => <FileInstance file={file} key={elementCounter++}></FileInstance>)
            }
        </>
    );
}

export default Workspace;
