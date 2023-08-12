import Draggable from "react-draggable";

import "./App.css";
import UploadMenu from "./uploadmenu.tsx";

function App() {
    return (
            <>
            <Draggable>
            <div className="widget">
            <UploadMenu />
            </div>
            </Draggable>
            </>
           );
}

export default App;
