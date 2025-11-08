import { useEffect, useState } from "react";
import {Proc} from './useStrudel';

export default function CPM({globalEditor, handleToggle}) {

    const [cpm, setCpm] = useState(30);

    useEffect(() => {
        if (!globalEditor) return;
        const textArea = document.getElementById("proc");
        if (!textArea) return;

        // Replace existing setcpm(n) call, or add it if missing
        let text = textArea.value;
        if (text.match(/setcpm\(\d*\)/)) {
            text = text.replace(/setcpm\(\d*\)/, `setcpm(${cpm})`);
        } else {
            text = `setcpm(${cpm})\n` + text;
        }
        textArea.value = text;
        globalEditor.setCode(text);
        Proc(globalEditor);
        handleToggle();
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

