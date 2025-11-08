export default function CPM({volume, setVolume}) {
    return (
        <button className="btn btn-dark ms-3" 
                style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", color: 'lightgreen', fontSize: '1.5em', whiteSpace: "nowrap", height: "37.5px"}}>
            <input  type="range" 
                    className="form-range pb-2" 
                    id="volumeSlider" 
                    value={volume} 
                    onChange={(e) => setVolume(e.target.value)} 
                    style={{width: '130px'}}></input>
        </button>
    )
}