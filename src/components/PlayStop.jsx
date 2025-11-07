export default function PlayStop( {onToggle, isPlaying} ) {
    return (
        <>
            <button id="play" className="btn btn-dark col ms-3" onClick={onToggle} style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0"}}>
                { isPlaying ? <i className="bi bi-stop-fill"></i> : <i className="bi bi-play-fill"></i> }
            </button>
        </>
    )
}
