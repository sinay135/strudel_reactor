import { useEffect, useState } from "react";

export default function Volume() {

    const [volume, setVolume] = useState(80);

    return (
        <button className="btn btn-dark ms-3" 
                style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", color: 'lightgreen', fontSize: '1.5em', whiteSpace: "nowrap", height: "37.5px"}}>
            <input  type="range" 
                    className="form-range pb-2" 
                    id="volumeSlider" 
                    value={volume} 
                    onChange={(e) => setVolume(e.target.value)} 
                    style={{width: '130px'}} disabled></input>
        </button>
    )
}