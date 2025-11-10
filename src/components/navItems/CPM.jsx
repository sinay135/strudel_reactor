import { useEffect, useState } from "react";

export default function CPM({ setSongText }) {

    const [cpm, setCpm] = useState(30);

    useEffect(() => {
        // replace textarea.value with new textarea.value
        setSongText(textarea => textarea.replaceAll(/setcpm\(\d*\)/g, `setcpm(${cpm})`))
    }, [cpm]);

    return (
        <div class="input-group ps-3">
            <div class="input-group-prepend">
                <span   class="input-group-text bg-dark" 
                        style={{color: "white", height: "37.5px", borderTopRightRadius: '0', borderBottomRightRadius: '0', borderBottomLeftRadius: '0', borderWidth: '0'}} 
                        id="cpm_label">CPM</span>
            </div>
            <div className="col-1">
                <input  type="text" 
                        class="form-control" 
                        style={{backgroundColor: "rgba(55, 55, 55, 1)", height: "37.5px", color: "lightgrey", borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', borderWidth: '0'}} 
                        placeholder="/" 
                        aria-label="cpm" 
                        value={cpm} 
                        onChange={(e) => setCpm(e.target.value)}
                        aria-describedby="cpm-label"/>
            </div>
        </div>
    )
}

