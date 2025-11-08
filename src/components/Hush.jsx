export default function Hush() {
    return (
        <div className="ps-4 py-2 row">
            <div className="form-check col-5">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check col-5">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>
        </div>
    )
}
