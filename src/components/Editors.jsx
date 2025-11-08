export default function Editors({defaultValue, onChange, displayChecked, displaySize, controlChecked, editorSize}) {
    return (
        <div className="row g-0" >
            <div className="col-2 bg-dark " style={{ display: controlChecked ? "block" : "none", maxHeight: '90vh'}}></div>

            <div className={`col-${displaySize}`} style={{overflowY: 'hidden', display: displayChecked ? "block" : "none"}}>
                <textarea   className="rounded-0 form-control" 
                    defaultValue={defaultValue} 
                    onChange={onChange} 
                    style={{borderTopRightRadius: "1", scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)', backgroundColor: "lightgreen", border: "none", height: '90vh', overflowY: 'auto', 
                        display: displayChecked ? "block" : "none"
                    }} 
                    
                    id="proc">
                </textarea> 
            </div>
            
            <div className={`col-${editorSize}`}>
                <div style={{ maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                    <div id="editor" />
                    <div id="output" />
                </div>
            </div>

            <div className="col-1 ps-0">
                <canvas id="roll" style={{height: '90vh'}}></canvas>
            </div>
        </div>
    )
}
