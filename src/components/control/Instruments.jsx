import Hush from "./Hush";

export default function Instruments({items, setSongText}) {
    if (items.length == 0) return (
        <button className="btn text-dark col-11" style={{backgroundColor: "lightgreen", marginInlineStart: "10px"}}>No Labels</button>
    );

    return (
        <ul className="list-group">
            {items.map((item, i) => (
                <li key={i} className={i == 0 ? "mt-0" : "mt-2"}>
                    <div className="card col mx-2" style={{backgroundColor: 'rgba(205, 255, 220, 1)'}}>
                        <div className="card-header py-0 px-0 rounded-bottom" style={{ backgroundColor: "lightgreen" }} id={`heading${i}`}>
                            <h5 className="mb-0">
                                <button className="btn text-dark col-12" type="button" data-bs-toggle="collapse" aria-expanded="false"
                                        data-bs-target={`#collapse${i}`}
                                        aria-controls={`collapse${i}`}>
                                    {item}
                                </button>
                            </h5>
                        </div>

                        <div id={`collapse${i}`} className="collapse rounded-bottom" aria-labelledby={`heading${i}`} style={{backgroundColor: 'rgba(205, 255, 220, 1)'}}>
                            <div className="card-body" >
                                <Hush label={item} name={`${item}${i}`} ON={`${item}ON`} OFF={`${item}OFF`} setSongText={setSongText} />
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}