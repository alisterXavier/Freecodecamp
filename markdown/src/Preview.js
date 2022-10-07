import React from "react";
import {marked} from 'marked'


function Preview(props){
    return(
        <div>
            <h1>Preview</h1>
            <div id="preview">
                  <div className="scroll" dangerouslySetInnerHTML={{__html: marked(props.text, {breaks: true})}}></div>
              </div>
        </div>
    )
}

export default Preview
