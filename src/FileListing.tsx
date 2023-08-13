class FileListing {
    constructor(onUpload: (file: File) => void) {
        this.files = [];
        this.onUpload = onUpload;
    }

    files: Array<File>;
    onUpload: (file: File) => void;

    addFile(file: File) {
        this.files.push(file);
        this.onUpload(file);
    }

    removeFile(file: File) {
        this.files = this.files.filter((f) => f !== file);
    }
}

export default FileListing;
