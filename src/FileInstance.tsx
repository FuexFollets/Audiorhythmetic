import Draggable from 'react-draggable';
import "./index.css";


function FileInstance(props: {file: File}) {
    return (
        <Draggable>
            <div className="widget">
                <p>{props.file.name}</p>
            </div>
        </Draggable>
    );
}

export default FileInstance;
