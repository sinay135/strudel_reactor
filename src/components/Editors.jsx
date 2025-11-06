


export default function Editors({defaultValue, onChange}) {
    return (
        <div className="row">
            <div className="col-11">
                <div className="ps-1" style={{ maxHeight: '58vh', overflowY: 'auto'}}>
                    <textarea className="rounded-0 form-control" defaultValue={defaultValue} onChange={onChange} style={{borderTopRightRadius: "1", scrollbarWidth: "thin", scrollbarColor: 'grey rgba(230, 230, 230, 1)'}} rows="8" id="proc" ></textarea>
                </div>
                <div className="ps-1 pe-0" style={{ maxHeight: '58vh', overflowY: 'auto', scrollbarWidth: "thin", scrollbarColor: 'lightgreen rgba(30, 30, 30, 1)'}}>
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
