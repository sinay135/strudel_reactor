export default function Switch({ i, setSwitches }) {
    return (
        <div className="col-1" key={i}>
            <div className="form-check form-switch m-0" style={{transform: "rotate(270deg)"}}>
                <input className='form-check-input' 
                onChange={() => 
                    setSwitches((e) => {
                        const clone = [...e];  // create a clone of the previous array
                        clone[i] = !clone[i];  // toggle the the bool value
                        return clone;          // replace old array with new
                    })
                }
                style={{backgroundColor: `${i % 2 ? 'rgba(61, 61, 61, 1)' : 'rgba(137, 255, 157, 1)'}`, borderRadius: "0.3em"}} type="checkbox" id={`switch${i}`}/>
            </div>
        </div>
    )
}