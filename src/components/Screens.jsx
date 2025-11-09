import { useEffect, useState } from "react";
import Instruments from "./control/Instruments";
import { stranger_tune } from '../tunes';

function Control( {controlChecked, items, setSongText} ) {
    return (
        <div className="col-2 bg-dark " style={{ display: controlChecked ? "block" : "none", height: '92vh', overflow: 'hidden'}}>
            <div style={{ maxHeight: '100%', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                <Instruments items={items} setSongText={setSongText} />
            </div>
        </div>
    )
}

function Display( {displaySize, displayChecked, value, onChange} ) {
    return (
        <div className={`col-${displaySize}`} style={{overflowY: 'hidden', display: displayChecked ? "block" : "none"}}>
            <textarea   className="rounded-0 form-control" 
                value={value} 
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

export default function Screens({globalEditor, displayChecked, displaySize, controlChecked, isPlaying}) {
    
    const [songText, setSongText] = useState(stranger_tune);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // when textarea is edited update Editor
        if (!globalEditor) return;
        globalEditor.setCode(songText);

        // if playing, update audio code
        if (isPlaying) globalEditor.evaluate();
        
        // find labels in songText eg. "bassline"
        const labels = [...songText.matchAll(/^\s*_?([a-zA-Z0-9_]+):/gm)];
        setItems(labels.map(m => m[1]));

    }, [songText, globalEditor])

    return (
        <div className="row g-0" >
            <Control    controlChecked={controlChecked} items={items} setSongText={setSongText} />

            <Display    displaySize={displaySize} 
                        displayChecked={displayChecked} 
                        value={songText} 
                        onChange={(e) => setSongText(e.target.value)} />
            
            <Editor     isDisplayChecked={displayChecked} 
                        isControlChecked={controlChecked} />

            <div className="col-1 ps-0">
                <canvas id="roll" style={{height: '92vh'}}></canvas>
            </div>
        </div>
    )
}
