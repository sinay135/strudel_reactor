export default function Instruments({items}) {
    if (items.length == 0) return (
        <button className="btn text-dark col-11" style={{backgroundColor: "lightgreen", marginInlineStart: "10px"}}>No Labels</button>
    );

    return (
        <ul className="list-group">
            {items.map((item, i) => (
                <li key={i} className="mt-1">
                    <div className="card col-11" style={{ marginInlineStart: "10px" }}>
                        <div className="card-header py-0 px-0" style={{ backgroundColor: "lightgreen" }} id={`heading${i}`}>
                            <h5 className="mb-0">
                                <button className="btn text-dark col-12" type="button" data-bs-toggle="collapse" aria-expanded="false"
                                        data-bs-target={`#collapse${i}`}
                                        aria-controls={`collapse${i}`}>
                                    {item}
                                </button>
                            </h5>
                        </div>

                        <div id={`collapse${i}`} className="collapse" aria-labelledby={`heading${i}`}>
                            <div className="card-body">
                                rahhh
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}