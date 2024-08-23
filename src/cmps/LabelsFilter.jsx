import { useEffect, useState } from "react";
import { getData } from "../services/stay.data";

export function LabelsFilter() {
    const allLabels = getData('labels')
    const [index, setIndex] = useState(1)
    const [slicedLabels, setSlicedLabels] = useState([])
    const INDEX_SIZE = 12
    useEffect(() => {
        const start = INDEX_SIZE * index
        const end = start + INDEX_SIZE;
        const newLabels = allLabels.slice(start, end)
        setSlicedLabels(newLabels)
    }, [index])

    function changeIndex(leftRight) {
        if (leftRight === 'left') {
            setIndex(prev => prev - 1)
        }
        else {
            setIndex(prev => prev + 1)
        }
    }

    return <section className="labels-filter">
        <button onClick={() => changeIndex('left')} >{'<'}</button>
        {slicedLabels.map(label => {
            return <div>
                <img src={label.img} />
                <p>{label.label}</p>
            </div>
        })}
        <button onClick={() => changeIndex('right')}>{'>'}</button>
    </section>
}