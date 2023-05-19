// import EventEmitter from "events"
import Module from "./wasm/module.js"
import { waitFor } from "./util/waitfor.tsx"

const _wasmModuleRaw = Module
let _wasmModuleInitialized = false

_wasmModuleRaw['onRuntimeInitialized'] = () => {
    _wasmModuleInitialized = true
}

export async function wasmModuleRaw() {
    if (_wasmModuleInitialized) {
        return _wasmModuleRaw
    }

    await waitFor(() => _wasmModuleInitialized)

    return _wasmModuleRaw
}
