import { useEffect, useState } from "react"


export default function Sequence() {

    const [switches, setSwitches] = useState(Array(12).fill(false));
    const [selected, setSelected] = useState("");
    const [sequence, setSequence] = useState("");
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const seq = switches.map(on => on ? selected : "- ").join("");
        setSequence(seq);

    }, [switches, selected])

    return (
        <>
            <div className="mx-2 mb-3">
                <select className="form-select py-1" onChange={(e) => setSelected(e.target.value)} style={{backgroundColor: 'rgba(205, 255, 220, 1)'}} aria-label="Default select example">
                    <option value="- ">Select Sequence</option>
                    <option value="hh ">hh</option>
                    <option value="bd ">bd</option>
                    <option value="mt ">mt</option>
                    <option value="lt ">lt</option>
                    <option value="sd ">sd</option>
                </select>
            </div>
            <div className="row w-100 ms-0 pb-3">
                <div className="d-flex justify-content-center align-items-center" style={{paddingInlineEnd: "40px"}}>
                    {Array.from({ length: 12 }).map((x, i) => (
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
                    ))}
                </div>
            </div>
        </>
    )
}
