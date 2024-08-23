import { getData } from "../services/stay.data";

export function LabelsFilter() {
    
    const labels = getData('labels').slice(1,10)
    

    return <section className="labels-filter">
        <button>{'<'}</button>
        {labels.map(label => {
            return <div>
                <img src={label.img} />
                <p>{label.label}</p>
            </div>
        })}
        <button>{'>'}</button>
    </section>
}