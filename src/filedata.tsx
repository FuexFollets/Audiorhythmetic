import { wasmModule } from "./wasmmod"

function FileData(props: { bytes: Uint8Array | undefined }) {
    console.log(wasmModule)

    if (props.bytes === undefined) {
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <p>{props.bytes.length}</p>
        </div>
    )
}

export default FileData
