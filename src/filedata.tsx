import { wasmModuleRaw } from "./wasmmod";

function FileData(props: { bytes: Uint8Array | undefined }) {
  (async () => {
    console.log((await wasmModuleRaw()).__Z6cpptenv());
    console.log((await wasmModuleRaw()).__Z9cppaddonei(90));
  })();

  if (props.bytes === undefined) {
    return <></>;
  }

  return (
    <div>
      <p>{props.bytes.length}</p>
    </div>
  );
}

export default FileData;
