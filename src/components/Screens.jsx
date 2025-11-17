import { useEffect, useState } from "react";
import Instruments from "./control/Instruments";
import Sequence from "./control/Sequence";

function Control( {controlChecked, items, setSongText} ) {
    return (
        <div className="col-2 bg-dark " style={{ display: controlChecked ? "block" : "none", height: '92vh', overflow: 'hidden'}}>
            <div style={{ maxHeight: '100%', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                <h5 className="text-center mt-3" style={{fontSize: '1.2rem', color: 'rgba(225, 255, 234, 1)'}}>Control Labels</h5>
                <p className="text-center" style={{fontSize: '0.8rem', color: 'rgba(225, 255, 234, 1)'}}>label in code eg- " bassline: "</p>
                <Instruments items={items} setSongText={setSongText} />

                <h5 className="text-center mt-3" style={{fontSize: '1.2rem', color: 'rgba(225, 255, 234, 1)'}}>Create New</h5>
                <p className="text-center" style={{fontSize: '0.8rem', color: 'rgba(225, 255, 234, 1)'}}>add a new sequence</p>
                <Sequence setSongText={setSongText} />
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

export default function Screens({ globalEditor, displayChecked, displaySize, controlChecked, isPlaying, songText, setSongText }) {
    
    // list of labels found in songText
    const [items, setItems] = useState([]);
    const [alert, setAlert] = useState(false);

    // when textarea is edited update Editor
    useEffect(() => {
        if (!globalEditor) return;

        // if textarea is empty
        if (!songText) {
            setAlert(true);
            globalEditor.setCode("");
            console.log("here")
            return;
        } else setAlert(false);
        
        globalEditor.setCode(songText);
        
        // find labels in songText eg. "bassline" (gather text before :)
        const labels = [...songText.matchAll(/^\s*_?([a-zA-Z0-9_]+):/gm)];
        setItems(labels.map(m => m[1]));

        // if playing, update audio with new changes
        if (isPlaying) globalEditor.evaluate();

    }, [songText, globalEditor])

    return (
        <>
            {alert &&
                <div className="alert alert-danger mb-0 pt-0 pb-4 col-11" style={{height: "10px", borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopLeftRadius: "0"}}>
                    Please enter code.
                </div>
            }
            
            <div className="row g-0" >
                <Control    controlChecked={controlChecked} items={items} setSongText={setSongText} globalEditor={globalEditor} />

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
        </>
    )
}
