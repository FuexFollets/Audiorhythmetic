import UploadMenu from "./UploadMenu.tsx";
import FileListing from "./FileListing.tsx";

function Workspace() {
    const uploadedSoundFiles: FileListing = new FileListing((file: File) => { 
        console.log(
            `Uploaded ${file.name}\n` +
            `All files: ${uploadedSoundFiles.files}`
        );
    });

    return (
        <UploadMenu fileList={uploadedSoundFiles}></UploadMenu>
    );
}

export default Workspace;
