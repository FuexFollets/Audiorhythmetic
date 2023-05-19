class UploadedSoundFileBits {
  private static _current_id = 0;
  private _id = 0;
  private _uintarray = new Uint8Array(0);

  constructor(soundFileBits: Uint8Array) {
    this._id = UploadedSoundFileBits._current_id++;
    this._uintarray = soundFileBits;
  }

  get id() {
    return this._id;
  }

  get uintarray() {
    return this._uintarray;
  }
}

class Globals {
  static allUint8Arrays = new Array<UploadedSoundFileBits>();
}

export { Globals, UploadedSoundFileBits };
