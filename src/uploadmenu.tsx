import { useState } from 'react'
import { Globals, UploadedSoundFileBits } from "./globals"

function UploadMenu() {
    const [fileName, setFileName] = useState("Upload")
    let soundFile: File 

    async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            soundFile = event.target.files[0]
        }
    }

    async function addSoundFile() {
        const buffer: ArrayBuffer = await soundFile.arrayBuffer()
        const u8array: Uint8Array = new Uint8Array(buffer)

        Globals.allUint8Arrays.push(new UploadedSoundFileBits(u8array))

        setFileName(`Successfully uploaded "${soundFile.name}"`)
    }

    return (
        <div>
            <input type="file" onChange={handleFile} />
            <br />
            <button onClick={addSoundFile}>{fileName}</button>
        </div>
    )
}

export default UploadMenu
