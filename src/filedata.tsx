import { wasmModuleRaw } from "./wasmmod";

function FileData(props: { bytes: Uint8Array | undefined }) {
  (async () => {
      const value = new (await wasmModuleRaw()).data_struct(1, 2, 10)

      console.log(value.a, value.b, value.c)
      console.log(value.sum())
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
