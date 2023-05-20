// import EventEmitter from "events"
import Module from "./wasm/module.js";

async function waitFor(conditionalFunction: () => boolean) {
  return new Promise<void>((resolve) => {
    if (conditionalFunction()) {
      resolve();
    } else {
      setTimeout(async () => {
        await waitFor(conditionalFunction);
        resolve();
      }, 100);
    }
  });
}

const _wasmModuleRaw = Module;
let _wasmModuleInitialized = false;

_wasmModuleRaw["onRuntimeInitialized"] = () => {
  _wasmModuleInitialized = true;
};

export async function wasmModuleRaw() {
  if (_wasmModuleInitialized) {
    return _wasmModuleRaw;
  }

  await waitFor(() => _wasmModuleInitialized);

  return _wasmModuleRaw;
}
