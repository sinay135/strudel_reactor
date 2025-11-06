
export default function CPM({cpm, setCpm}) {
    return (
        <div class="input-group mt-3 ps-3">
            <div class="input-group-prepend">
                <span class="input-group-text bg-dark" style={{color: "lightgreen", borderTopRightRadius: '0', borderBottomRightRadius: '0', borderWidth: '0'}} id="cpm_label">CPM</span>
            </div>
            <div className="col-3">
                <input  type="text" 
                        class="form-control" 
                        style={{backgroundColor: "lightgreen", borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderWidth: '0'}} 
                        placeholder="40" 
                        aria-label="cpm" 
                        value={cpm} 
                        onChange={(e) => setCpm(e.target.value)}
                        aria-describedby="cpm-label"/>
            </div>
        </div>
    )
}

