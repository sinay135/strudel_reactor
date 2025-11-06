

export default function PlayStop( {onPlay, onStop} ) {
    return (
        <>
            <button id="play" className="btn btn-dark col-md-1" onClick={onPlay} style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Play</button>
            <button id="stop" className="btn btn-dark col-md-1" onClick={onStop} style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>Stop</button>
        </>
    )
}
