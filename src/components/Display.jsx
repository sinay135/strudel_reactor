function DisplayButton( {isDisplayChecked, onDisplayToggle} ) {
    return (
        <button className="btn btn-dark col" style={{borderRadius: "0", paddingBlock: "5px"}}>
            <div class="form-check form-switch">
                <input  class="form-check-input bg-info"
                        style={{marginTop: "4.5px"}} 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked" 
                        checked={isDisplayChecked} 
                        onChange={onDisplayToggle}/>
                <label class="form-check-label" for="flexSwitchCheckChecked">Display</label>
            </div>
        </button>
    )
}

function ControlButton( {isControlChecked, onControlToggle} ) {
    return (
        <button className="btn btn-dark col" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopLeftRadius: "0", paddingBlock: "5px"}}>
            <div class="form-check form-switch">
                <input  class="form-check-input bg-info"
                        style={{marginTop: "4.5px"}} 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked" 
                        checked={isControlChecked} 
                        onChange={onControlToggle}/>
                <label class="form-check-label" for="flexSwitchCheckChecked">Control</label>
            </div>
        </button>
    )
}

export default function Display( {isDisplayChecked, onDisplayToggle, isControlChecked, onControlToggle}) {
    return (
        <>
            <DisplayButton isDisplayChecked={isDisplayChecked} onDisplayToggle={onDisplayToggle} />
            <ControlButton isControlChecked={isControlChecked} onControlToggle={onControlToggle}/>
        </>
    )
}


