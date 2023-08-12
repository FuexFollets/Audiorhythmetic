import { useState } from "react";
import { Globals, UploadedSoundFileBits } from "./globals";
import FileData from "./filedata";

function UploadMenu() {
  const [buttonText, setButtonText] = useState("Upload");
  const [fileDataState, setFileDataState] = useState<Uint8Array | undefined>(
    undefined
  );
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  const [buttonIsDisplayingUndefined, setButtonIsDisplayingUndefined] =
    useState(false);

  let soundFile: File;
  let u8array: Uint8Array | undefined;

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      soundFile = event.target.files[0];
      setFileState(soundFile);
    }

    soundFile.arrayBuffer().then((buffer) => {
      u8array = new Uint8Array(buffer);
      setFileDataState(u8array);
    });

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

    if (u8array) {
      Globals.allUint8Arrays.push(new UploadedSoundFileBits(u8array));
    } else if (fileState) {
      setButtonText(`Successfully added "${fileState.name}"`);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />
      <br />
      <button onClick={addSoundFile}>{buttonText}</button>
      <FileData bytes={fileDataState} />
    </div>
  );
}

export default UploadMenu;
