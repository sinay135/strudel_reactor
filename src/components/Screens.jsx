import { useEffect, useState } from "react";
import Hush from "./control/Hush";

function Control( {controlChecked} ) {
    return (
        <div className="col-2 bg-dark " style={{ display: controlChecked ? "block" : "none", maxHeight: '92vh'}}>
            <Hush />
        </div>
    )
}

function Display( {displaySize, displayChecked, defaultValue, onChange} ) {
    return (
        <div className={`col-${displaySize}`} style={{overflowY: 'hidden', display: displayChecked ? "block" : "none"}}>
            <textarea   className="rounded-0 form-control" 
                defaultValue={defaultValue} 
                onChange={onChange} 
                style={{borderTopRightRadius: "1", scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)', backgroundColor: "lightgreen", border: "none", height: '92vh', overflowY: 'auto', resize: "none", 
                    display: displayChecked ? "block" : "none"
                }}
                
                id="proc">
            </textarea> 
        </div>
    )
}

function Editor( {isDisplayChecked, isControlChecked} ) {    

    // adjust editor size through nav switches
    const [editorSize, setEditorSize] = useState(6);
    useEffect(() => {
        if (!isDisplayChecked && !isControlChecked) {
            setEditorSize(11);
        } else if (isDisplayChecked && !isControlChecked) {
            setEditorSize(6);
        } else if (!isDisplayChecked && isControlChecked) {
            setEditorSize(9);
        } else {
            setEditorSize(6);
        }
    }, [isDisplayChecked, isControlChecked]);

    return (
        <div className={`col-${editorSize}`}>
            <div style={{ maxHeight: '92vh', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                <div id="editor" />
                <div id="output" />
            </div>
        </div>
    )
}

export default function Screens({globalEditor, displayChecked, displaySize, controlChecked}) {
    
    const [songText, setSongText] = useState()

    // when textarea is edited update Editor
    useEffect(() => {
        if (!globalEditor) return;
        globalEditor.setCode(songText);
    }, [songText])

    return (
        <div className="row g-0" >
            <Control    controlChecked={controlChecked} />

            <Display    displaySize={displaySize} 
                        displayChecked={displayChecked} 
                        defaultValue={songText} 
                        onChange={(e) => setSongText(e.target.value)} />
            
            <Editor     isDisplayChecked={displayChecked} 
                        isControlChecked={controlChecked} />

            <div className="col-1 ps-0">
                <canvas id="roll" style={{height: '92vh'}}></canvas>
            </div>
        </div>
    )
}
