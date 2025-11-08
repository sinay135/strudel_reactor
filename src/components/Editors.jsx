export default function Editors({defaultValue, onChange, chkd}) {
    return (
        <div className="row g-0" >
            {chkd ? 
                <div className="col-5 ps-1" style={{overflowY: 'hidden'}}>
                    <textarea   className="rounded-0 form-control" 
                        defaultValue={defaultValue} 
                        onChange={onChange} 
                        style={{borderTopRightRadius: "1", scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)', backgroundColor: "lightgreen", border: "none"}} 
                        rows="27" 
                        id="proc" >
                     </textarea> 
                </div>
            : 
                <></>
            }
            
            <div className="col-6">
                <div className="ps-1" style={{ maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
                    <div id="editor" />
                    <div id="output" />
                </div>
            </div>

            <div className="col-1 ps-0">
                <canvas id="roll"></canvas>
            </div>
        </div>
    )
}
