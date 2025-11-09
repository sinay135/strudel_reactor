import { useEffect, useState } from "react"

export default function Hush({label, name, ON, OFF, setSongText}) {
    const [isON, setIsON] = useState(true);

    // remove or add _ on radio switch
    useEffect(() => {
        if (isON) {
            setSongText(textarea => textarea.replaceAll(`_${label}:`, `${label}:`));
        } else {
            setSongText(textarea => textarea.replaceAll(`${label}:`, `_${label}:`));
        }
    }, [isON]);

    return (
        <div className="row d-flex justify-content-center">
            <div className="form-check col-5 d-flex justify-content-center">
                <input className="form-check-input bg-dark" type="radio" name={name} id={ON} checked={isON} onChange={() => setIsON(true)} />
                <label className="form-check-label ms-2" htmlFor={ON}>
                    ON
                </label>
            </div>
            <div className="form-check col-5 d-flex justify-content-center">
                <input className="form-check-input bg-dark" type="radio" name={name} id={OFF} onChange={() => setIsON(false)}/>
                <label className="form-check-label ms-2" htmlFor={OFF}>
                    OFF
                </label>
            </div>
        </div>
    )
}
