export default function Display( {isDisplayChecked, onDisplayToggle}) {
    return (
        <button className="btn btn-dark col" style={{borderBottomLeftRadius: "0", borderBottomRightRadius: "0", borderTopLeftRadius: "0", paddingBlock: "5px"}}>
            <div class="form-check form-switch">
                <input  class="form-check-input bg-info" 
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


