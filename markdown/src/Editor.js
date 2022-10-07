import React from "react";

function Editor(props){
    return(
        <div>
            <h1>Editor</h1>
            <textarea id="editor" value={props.text} onChange={props.handle}></textarea>
        </div>
    )
}

export default Editor