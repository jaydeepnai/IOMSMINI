import React from "react";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Fab } from "@mui/material";
import { ProgressContext } from "../../App";
import { useContext } from "react";

export function DragDropFile({ setFileName, FileName, setImageUpload }) {
    const { setProgress } = useContext(ProgressContext)
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);


    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        setProgress(50)
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImageUpload(e.dataTransfer.files[0])
            setFileName(e.dataTransfer.files[0].name)
        }
        setProgress(100)
    };


    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} style={{ display: "flex" }}>
            <div>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div>
                        <p>Drag and drop your file here or</p>
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </div>
            {FileName != "" ?
                <div style={{ marginLeft: "25px" }}>
                    <Fab color="secondary" style={{ backgroundColor: "#696cff" }} aria-label="edit">
                        <FileCopyIcon />
                    </Fab>
                    <span className="ml-2">
                        {FileName}

                    </span>
                </div>
                : ""}
        </form>
    );
};
